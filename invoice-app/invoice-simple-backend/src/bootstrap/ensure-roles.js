const mongoose = require("mongoose");
const Role = require("../models/Role");
const RoleType = require("../models/RoleType");

async function ensureBuilderAndTradieRoles() {
  try {
    // Ensure RoleType 'Customers' exists
    let customersRoleType = await RoleType.findOne({ title: "Customers" });
    if (!customersRoleType) {
      customersRoleType = await RoleType.create({ title: "Customers", status: "active" });
    }

    const desiredRoles = [
      { title: "Builder" },
      { title: "Tradie" },
    ];

    for (const r of desiredRoles) {
      const existing = await Role.findOne({ title: r.title });
      if (!existing) {
        await Role.create({
          title: r.title,
          roleTypeId: customersRoleType._id,
          permissions: [],
          status: "active",
        });
        console.log(`Created role '${r.title}'`);
      }
    }
  } catch (err) {
    console.error("ensureBuilderAndTradieRoles error", err);
  }
}

module.exports = { ensureBuilderAndTradieRoles };

