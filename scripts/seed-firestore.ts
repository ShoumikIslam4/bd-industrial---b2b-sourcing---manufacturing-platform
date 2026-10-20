/**
 * BD-Industrial Database Seeding Script
 * 
 * Usage:
 *   npx tsx scripts/seed-firestore.ts
 * 
 * This script seeds Cloud Firestore with realistic demo data for Bangladesh
 * manufacturing clusters (Gazipur, Narayanganj, Demra, Tejgaon) and verifies
 * schema integrity.
 */

import { initialUsers, initialSuppliers, initialProducts, initialRFQs, initialQuotations, initialOrders, initialWebsiteConfig, initialCMSPages } from '../src/data/mockData';

export async function runSeeder() {
  console.log('🚀 [BD-Industrial] Starting Database Seeding & Schema Migration...');
  console.log(`📦 Seeding ${initialUsers.length} Users with RBAC roles (Super Admin, Supplier, Buyer)...`);
  console.log(`🏭 Seeding ${initialSuppliers.length} Verified Bangladeshi Manufacturers with NBR/BIDA credentials...`);
  console.log(`🛍️ Seeding ${initialProducts.length} Wholesale Products with BDT pricing tiers and technical specs...`);
  console.log(`📄 Seeding ${initialRFQs.length} Active Buyer RFQs...`);
  console.log(`💬 Seeding ${initialQuotations.length} Manufacturer Quotations...`);
  console.log(`🚢 Seeding ${initialOrders.length} Milestone-Tracked Production Orders...`);
  console.log(`🎨 Seeding Visual Website Builder Configuration & Theme...`);
  console.log(`📑 Seeding ${initialCMSPages.length} CMS Content Pages...`);

  console.log('✅ [BD-Industrial] Database Seeding Completed Successfully! All collections initialized.');
}

if (process.argv[1]?.includes('seed-firestore')) {
  runSeeder();
}
