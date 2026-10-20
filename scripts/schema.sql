-- BD-Industrial B2B Manufacturing & Wholesale Platform
-- Database Schema Script & Migrations (PostgreSQL / Relational)

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(256) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('superadmin', 'admin', 'supplier', 'buyer')),
    company_name VARCHAR(256) NOT NULL,
    phone VARCHAR(64),
    location VARCHAR(256),
    status VARCHAR(32) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS suppliers (
    id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(128) REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(256) NOT NULL,
    slug VARCHAR(256) UNIQUE NOT NULL,
    business_type VARCHAR(64) NOT NULL CHECK (business_type IN ('Manufacturer', 'Wholesaler', 'Exporter', 'Industrial Supplier')),
    factory_location TEXT NOT NULL,
    industrial_zone VARCHAR(128) NOT NULL,
    established_year INT NOT NULL,
    employee_count INT NOT NULL,
    certifications TEXT[], -- ['BSCI', 'OEKO-TEX', 'ISO 9001', 'GOTS']
    capabilities TEXT[],
    factory_photos TEXT[],
    verified BOOLEAN DEFAULT FALSE,
    verification_expires_at DATE,
    trade_license_number VARCHAR(128),
    tin_number VARCHAR(128),
    bin_number VARCHAR(128),
    rating NUMERIC(3,2) DEFAULT 4.8,
    response_rate VARCHAR(64) DEFAULT '95%',
    completed_orders_count INT DEFAULT 0,
    min_order_amount_bdt NUMERIC(12,2) DEFAULT 100000.00,
    contact_email VARCHAR(256),
    contact_phone VARCHAR(64),
    whatsapp VARCHAR(64),
    about TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(128) PRIMARY KEY,
    supplier_id VARCHAR(128) REFERENCES suppliers(id) ON DELETE CASCADE,
    supplier_name VARCHAR(256) NOT NULL,
    supplier_verified BOOLEAN DEFAULT TRUE,
    title VARCHAR(256) NOT NULL,
    slug VARCHAR(256) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL,
    sub_category VARCHAR(128) NOT NULL,
    description TEXT,
    images TEXT[],
    sku VARCHAR(128) UNIQUE NOT NULL,
    moq INT NOT NULL DEFAULT 500,
    moq_unit VARCHAR(64) NOT NULL DEFAULT 'Pieces',
    pricing_tiers JSONB NOT NULL, -- [{"minQty": 500, "maxQty": 1999, "unitPriceBDT": 285}, ...]
    specifications JSONB NOT NULL, -- {"GSM": "180", "Composition": "100% Cotton"}
    customization_options JSONB,
    lead_time_days INT NOT NULL DEFAULT 14,
    sample_available BOOLEAN DEFAULT TRUE,
    sample_price_bdt NUMERIC(10,2) DEFAULT 500.00,
    stock_status VARCHAR(32) DEFAULT 'made_to_order' CHECK (stock_status IN ('made_to_order', 'in_stock', 'low_stock')),
    featured BOOLEAN DEFAULT FALSE,
    popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rfqs (
    id VARCHAR(128) PRIMARY KEY,
    buyer_id VARCHAR(128) REFERENCES users(id) ON DELETE SET NULL,
    buyer_name VARCHAR(128) NOT NULL,
    buyer_email VARCHAR(256) NOT NULL,
    buyer_phone VARCHAR(64) NOT NULL,
    buyer_company VARCHAR(256) NOT NULL,
    title VARCHAR(256) NOT NULL,
    category VARCHAR(64) NOT NULL,
    target_quantity INT NOT NULL,
    target_unit VARCHAR(64) NOT NULL,
    target_budget_bdt NUMERIC(14,2),
    specifications JSONB,
    custom_requirements TEXT,
    attachments TEXT[],
    delivery_district VARCHAR(128) NOT NULL,
    deadline_date DATE NOT NULL,
    status VARCHAR(32) DEFAULT 'open' CHECK (status IN ('open', 'quotes_received', 'assigned', 'in_production', 'completed', 'cancelled')),
    assigned_supplier_id VARCHAR(128) REFERENCES suppliers(id) ON DELETE SET NULL,
    quotes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quotations (
    id VARCHAR(128) PRIMARY KEY,
    rfq_id VARCHAR(128) REFERENCES rfqs(id) ON DELETE CASCADE,
    rfq_title VARCHAR(256) NOT NULL,
    supplier_id VARCHAR(128) REFERENCES suppliers(id) ON DELETE CASCADE,
    supplier_name VARCHAR(256) NOT NULL,
    supplier_email VARCHAR(256) NOT NULL,
    buyer_id VARCHAR(128) REFERENCES users(id) ON DELETE CASCADE,
    unit_price_bdt NUMERIC(10,2) NOT NULL,
    total_amount_bdt NUMERIC(14,2) NOT NULL,
    moq_offered INT NOT NULL,
    lead_time_days INT NOT NULL,
    validity_until DATE NOT NULL,
    notes TEXT,
    sample_offered BOOLEAN DEFAULT TRUE,
    payment_terms TEXT,
    status VARCHAR(32) DEFAULT 'submitted' CHECK (status IN ('submitted', 'accepted', 'rejected', 'revised')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(128) PRIMARY KEY,
    rfq_id VARCHAR(128) REFERENCES rfqs(id),
    quotation_id VARCHAR(128) REFERENCES quotations(id),
    buyer_id VARCHAR(128) REFERENCES users(id),
    buyer_name VARCHAR(256) NOT NULL,
    supplier_id VARCHAR(128) REFERENCES suppliers(id),
    supplier_name VARCHAR(256) NOT NULL,
    product_title VARCHAR(256) NOT NULL,
    quantity INT NOT NULL,
    unit_price_bdt NUMERIC(10,2) NOT NULL,
    total_amount_bdt NUMERIC(14,2) NOT NULL,
    current_milestone VARCHAR(64) NOT NULL,
    milestones JSONB NOT NULL,
    delivery_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS website_config (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'default',
    hero JSONB NOT NULL,
    sections JSONB NOT NULL,
    theme JSONB NOT NULL,
    announcement JSONB NOT NULL,
    footer JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(128) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actor_email VARCHAR(256) NOT NULL,
    actor_role VARCHAR(64) NOT NULL,
    action VARCHAR(128) NOT NULL,
    details TEXT
);
