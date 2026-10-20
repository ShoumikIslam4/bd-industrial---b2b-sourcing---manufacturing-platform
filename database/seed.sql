-- BD-Industrial B2B Manufacturing Platform
-- Seed Data Script (database/seed.sql)

-- 1. Initial Users
INSERT INTO users (id, email, name, role, company_name, phone, location, status, password_hash)
VALUES 
  ('user-admin-1', 'admin@bdsource.com.bd', 'Tariq Rahman', 'superadmin', 'BD-Industrial National Platform HQ', '+880 1711-000111', 'Gulshan-1, Dhaka', 'active', 'admin123456'),
  ('user-sup-1', 'sales@apexapparels-bd.com', 'Engr. Mahbubul Alam', 'supplier', 'Apex Composite Knitwear Ltd.', '+880 1819-223344', 'Konabari, Gazipur', 'active', 'supplier123'),
  ('user-sup-2', 'info@delta-pack.com.bd', 'Farhana Hossain', 'supplier', 'Delta Industrial Packaging & Cartons Ltd.', '+880 1712-889900', 'Adamjee EPZ, Narayanganj', 'active', 'supplier123'),
  ('user-sup-3', 'commercial@banglajute.org', 'Kazi Nazmul Huda', 'supplier', 'Bengal Eco-Jute & Fiber Mills', '+880 1911-334455', 'Demra, Dhaka', 'active', 'supplier123'),
  ('user-sup-4', 'engineering@dhakacnc.com', 'Engr. Saifur Reza', 'supplier', 'Dhaka Precision CNC & Light Engineering Ltd.', '+880 1713-445566', 'Tejgaon I/A, Dhaka', 'active', 'supplier123'),
  ('user-buyer-1', 'procurement@nordicretail.se', 'Lars Lindqvist', 'buyer', 'Nordic Sourcing Group AB', '+46 8 123 4567', 'Stockholm / Dhaka Liaison Office', 'active', 'buyer123'),
  ('user-buyer-2', 'sourcing@aarongcraft.com.bd', 'Shirin Akhter', 'buyer', 'Bengal Retail & Merchandising Corp.', '+880 1611-778899', 'Tejgaon, Dhaka', 'active', 'buyer123')
ON CONFLICT (id) DO NOTHING;

-- 2. Initial Suppliers
INSERT INTO suppliers (
  id, user_id, company_name, slug, business_type, factory_location, industrial_zone, established_year,
  employee_count, certifications, capabilities, factory_photos, verified, trade_license_number,
  tin_number, bin_number, rating, response_rate, completed_orders_count, min_order_amount_bdt,
  contact_email, contact_phone, whatsapp, about
)
VALUES
  (
    'sup-1', 'user-sup-1', 'Apex Composite Knitwear Ltd.', 'apex-composite-knitwear-ltd', 'Manufacturer',
    'Plot 14-18, Konabari & Kashimpur Highway, Gazipur', 'Gazipur Industrial Belt', 2004, 3850,
    ARRAY['LEED Platinum', 'OEKO-TEX Standard 100', 'WRAP Certified', 'BSCI Audited'],
    ARRAY['Circular Knitting', 'Zero Liquid Discharge Dyeing', 'Computerized CAD Cutting', 'Automated Sewing'],
    ARRAY['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'],
    TRUE, 'TRAD/GZP/2024/09881', '784592019344', '001284920-0101', 4.95, '98%', 420, 250000.00,
    'sales@apexapparels-bd.com', '+880 1819-223344', '+8801819223344',
    'Premier vertical composite knitwear manufacturing facility serving global retailers with organic combed cotton and technical performance wear.'
  ),
  (
    'sup-2', 'user-sup-2', 'Delta Industrial Packaging & Cartons Ltd.', 'delta-industrial-packaging-cartons-ltd', 'Manufacturer',
    'Sector 2, Road 4, Adamjee Export Processing Zone, Narayanganj', 'Adamjee EPZ (Narayanganj)', 2011, 620,
    ARRAY['ISO 9001:2015', 'FSC Certified', 'RoHS Compliant'],
    ARRAY['5-Ply Corrugated Board Production', 'High-speed Flexographic Printing', 'Rotary Die Cutting', 'Poly-mailer Extrusion'],
    ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80'],
    TRUE, 'TRAD/NRG/2023/11452', '693481029481', '003492817-0202', 4.88, '94%', 310, 150000.00,
    'info@delta-pack.com.bd', '+880 1712-889900', '+8801712889900',
    'Specialized in heavy export master shippers, corrugated boxes, and eco-friendly honeycomb paper protective packaging.'
  ),
  (
    'sup-3', 'user-sup-3', 'Bengal Eco-Jute & Fiber Mills', 'bengal-eco-jute-fiber-mills', 'Manufacturer',
    'Demra Riverbank Industrial Belt, Demra, Dhaka', 'Demra Industrial Zone', 1998, 1200,
    ARRAY['OEKO-TEX ECO PASSPORT', 'ISO 14001', 'Fair Trade Certified'],
    ARRAY['Hydrocarbon-Free Spinning', 'Heavy Sacking Looms', 'Lamination & Printing', 'Geo-Textile Weaving'],
    ARRAY['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'],
    TRUE, 'TRAD/DHK/2022/44810', '581930284712', '004918239-0303', 4.90, '96%', 540, 200000.00,
    'commercial@banglajute.org', '+880 1911-334455', '+8801911334455',
    'Pioneering sustainable natural fiber jute burlap sacks, geotextiles, and promotional shopping bags for export markets.'
  ),
  (
    'sup-4', 'user-sup-4', 'Dhaka Precision CNC & Light Engineering Ltd.', 'dhaka-precision-cnc-light-engineering-ltd', 'Industrial Supplier',
    'Shaheed Tajuddin Ahmed Sarani, Tejgaon I/A, Dhaka', 'Tejgaon Light Engineering', 2015, 140,
    ARRAY['ISO 9001:2015', 'BUET Mechanical Testing Approved'],
    ARRAY['5-Axis CNC Milling', 'Conveyor Roller Dynamic Balancing', 'Surface Grinding', 'Heat Treatment'],
    ARRAY['https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80'],
    TRUE, 'TRAD/TJG/2024/00319', '819203948571', '005829104-0404', 4.92, '99%', 190, 80000.00,
    'engineering@dhakacnc.com', '+880 1713-445566', '+8801713445566',
    'Computerized CNC precision components, replacement shafts, stenter clip refurbishments, and industrial transmission spare parts.'
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Initial Products
INSERT INTO products (
  id, supplier_id, supplier_name, supplier_verified, title, slug, category, sub_category,
  description, images, sku, moq, moq_unit, pricing_tiers, specifications, customization_options,
  lead_time_days, sample_available, sample_price_bdt, stock_status, featured, popular
)
VALUES
  (
    'prod-1', 'sup-1', 'Apex Composite Knitwear Ltd.', TRUE,
    'Export-Grade 100% Combed Cotton Heavyweight Crewneck T-Shirt (220 GSM)',
    'export-grade-100-combed-cotton-heavyweight-crewneck-t-shirt-220-gsm',
    'garments', 'Knitwear',
    'Premium heavyweight single jersey combed ring-spun cotton t-shirt built for international wholesale and retail distribution.',
    ARRAY['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'],
    'BD-APP-2026-001', 500, 'Pieces',
    '[{"minQty": 500, "maxQty": 1999, "unitPriceBDT": 285}, {"minQty": 2000, "maxQty": 4999, "unitPriceBDT": 260}, {"minQty": 5000, "maxQty": 99999, "unitPriceBDT": 240}]'::jsonb,
    '{"GSM Weight": "220 GSM", "Composition": "100% Combed Organic Cotton", "Shrinkage Tolerance": "Less than 3% after wash", "Color Fastness": "Grade 4.5 Reactive Dyeing"}'::jsonb,
    '[{"name": "Branding", "options": ["Woven Label", "High-Density Screenprint", "Embroidery"]}]'::jsonb,
    14, TRUE, 450.00, 'made_to_order', TRUE, TRUE
  ),
  (
    'prod-2', 'sup-2', 'Delta Industrial Packaging & Cartons Ltd.', TRUE,
    '5-Ply Heavy-Duty Export Corrugated Master Carton (Kraft ECT 44)',
    '5-ply-heavy-duty-export-corrugated-master-carton-kraft-ect-44',
    'packaging', 'Corrugated Cartons',
    'High-crush resistance 5-ply export shippers engineered for maritime sea freight stacking and apparel carton packaging.',
    ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80'],
    'BD-PCK-2026-002', 1000, 'Boxes',
    '[{"minQty": 1000, "maxQty": 4999, "unitPriceBDT": 68}, {"minQty": 5000, "maxQty": 9999, "unitPriceBDT": 62}, {"minQty": 10000, "maxQty": 99999, "unitPriceBDT": 56}]'::jsonb,
    '{"Board Grade": "5-Ply BC Flute", "Bursting Strength": "14 kg/cm²", "Edge Crush Test (ECT)": "ECT 44", "Paper Grade": "180 GSM Virgin Kraft Liner"}'::jsonb,
    '[{"name": "Printing", "options": ["Single Color Flexo", "Two Color Barcode Flexo", "Waterproof Wax Coating"]}]'::jsonb,
    7, TRUE, 120.00, 'made_to_order', TRUE, TRUE
  ),
  (
    'prod-3', 'sup-3', 'Bengal Eco-Jute & Fiber Mills', TRUE,
    'Hydrocarbon-Free Food Grade Golden Jute Sacking Bags (50kg Capacity)',
    'hydrocarbon-free-food-grade-golden-jute-sacking-bags-50kg-capacity',
    'jute', 'Jute Sacks & Bags',
    'Vegetable-oil treated, food-grade biodegradable burlap sacks complying with European food safety standards for coffee, cocoa, and grain exports.',
    ARRAY['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'],
    'BD-JUT-2026-003', 1000, 'Sacks',
    '[{"minQty": 1000, "maxQty": 4999, "unitPriceBDT": 115}, {"minQty": 5000, "maxQty": 19999, "unitPriceBDT": 105}, {"minQty": 20000, "maxQty": 99999, "unitPriceBDT": 98}]'::jsonb,
    '{"Dimensions": "44 x 26.5 inches", "Weight": "2.25 lbs per sack", "Batching Agent": "Vegetable Rice Bran Oil (Hydrocarbon-Free)", "Stitching": "Overhead Herackle safety seam"}'::jsonb,
    '[{"name": "Custom Marking", "options": ["2-Stripe Identification", "Export Destination Stenciling", "Custom Logo Silk Screen"]}]'::jsonb,
    12, TRUE, 200.00, 'in_stock', TRUE, FALSE
  )
ON CONFLICT (id) DO NOTHING;

-- 4. Initial RFQs
INSERT INTO rfqs (
  id, buyer_id, buyer_name, buyer_email, buyer_phone, buyer_company,
  title, category, target_quantity, target_unit, target_budget_bdt,
  specifications, custom_requirements, attachments, delivery_district,
  deadline_date, status, assigned_supplier_id, quotes_count
)
VALUES
  (
    'rfq-101', 'user-buyer-1', 'Lars Lindqvist', 'procurement@nordicretail.se', '+46 8 123 4567', 'Nordic Sourcing Group AB',
    '15,000 Pcs Organic Combed Cotton Hoodies & Crewnecks with GOTS Certification',
    'garments', 15000, 'Pieces', 8500000.00,
    '{"GSM": "320 GSM French Terry", "Certifications Required": "GOTS + OEKO-TEX Standard 100"}'::jsonb,
    'Need custom silicone garment wash and double needle topstitching on neck rib. Inspection AQL 1.5 pass required.',
    ARRAY['techpack_hoodie_v2.pdf'], 'Dhaka', '2026-11-30', 'open', 'sup-1', 2
  ),
  (
    'rfq-102', 'user-buyer-2', 'Shirin Akhter', 'sourcing@aarongcraft.com.bd', '+880 1611-778899', 'Bengal Retail & Merchandising Corp.',
    '25,000 Sets Corrugated Packaging Boxes for Handloom Textile Retail',
    'packaging', 25000, 'Boxes', 1800000.00,
    '{"Flute": "E-Flute and B-Flute combination", "Finish": "Matte lamination with spot UV brand logo"}'::jsonb,
    'Boxes must have auto-lock bottom construction for fast warehouse packing speed.',
    ARRAY['packaging_dieline_spec.pdf'], 'Gazipur', '2026-12-15', 'open', 'sup-2', 1
  )
ON CONFLICT (id) DO NOTHING;

-- 5. Initial Audit Logs
INSERT INTO audit_logs (id, timestamp, actor_email, actor_role, action, details)
VALUES
  ('log-seed-1', CURRENT_TIMESTAMP - INTERVAL '2 days', 'admin@bdsource.com.bd', 'superadmin', 'PLATFORM_INIT', 'System initialized with verified Bangladesh manufacturers in Gazipur, Adamjee EPZ, and Tejgaon'),
  ('log-seed-2', CURRENT_TIMESTAMP - INTERVAL '1 day', 'admin@bdsource.com.bd', 'superadmin', 'SUPPLIER_VERIFY', 'Approved supplier Apex Composite Knitwear Ltd. (Trade License TRAD/GZP/2024/09881 verified)'),
  ('log-seed-3', CURRENT_TIMESTAMP, 'system@bdsource.com.bd', 'system', 'DB_MIGRATION', 'PostgreSQL database seeded successfully');
