import type { Core } from '@strapi/strapi';

type PermissionTree = Record<
  string,
  { controllers?: Record<string, Record<string, { enabled?: boolean; policy?: string }>> }
>;

const PUBLIC_FIND_TOGGLES: Array<{ apiKey: string; controller: string; action: string }> = [
  { apiKey: 'api::faq', controller: 'faq', action: 'find' },
  { apiKey: 'api::contact-form', controller: 'contact-form', action: 'find' },
];


async function ensurePublicContentFind(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole?.id) return;

  const roleService = strapi.plugin('users-permissions').service('role');
  const roleDetails = await roleService.findOne(publicRole.id);
  const permissions = structuredClone(roleDetails.permissions) as PermissionTree;

  let changed = false;
  for (const { apiKey, controller, action } of PUBLIC_FIND_TOGGLES) {
    const entry = permissions[apiKey]?.controllers?.[controller]?.[action];
    if (!entry) {
      strapi.log.warn(
        `users-permissions: no permission slot ${apiKey}.${controller}.${action} (check API UID)`,
      );
      continue;
    }
    if (!entry.enabled) {
      entry.enabled = true;
      changed = true;
    }
  }

  if (changed) {
    await roleService.updateRole(publicRole.id, {
      name: roleDetails.name,
      description: roleDetails.description,
      permissions,
    });
    strapi.log.info('users-permissions: public role can find FAQ and contact-form');
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicContentFind(strapi);
  },
};
