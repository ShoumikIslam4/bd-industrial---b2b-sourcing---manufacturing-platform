# BD-Industrial Platform — API & Architecture Reference

## Overview
BD-Industrial is a production-grade B2B manufacturing and wholesale sourcing platform for Bangladesh connecting verified manufacturers, industrial suppliers, distributors, and global/local enterprise buyers.

---

## 1. Authentication & Role-Based Access Control (RBAC)

### User Roles
- `superadmin`: Full platform control, visual website builder, theme styling, CMS pages, supplier verification, and system settings.
- `admin`: Operations management (suppliers, RFQs, orders, products).
- `supplier`: Factory profile management, product listings, quotation submissions, production milestone updates.
- `buyer`: Post RFQs, compare quotations, download PDF quotes, place orders, track milestones.

### Authentication Endpoints / Firebase Auth
- `POST /api/auth/login`: Authenticate via Firebase Email/Password or Google OAuth popup.
- `POST /api/auth/logout`: Invalidate user session and token.
- `GET /api/auth/me`: Retrieve active profile, roles, and company affiliations.

---

## 2. Product Management API

### `GET /api/products`
Retrieve paginated wholesale product listings.
- **Query Parameters:**
  - `category` (optional): `garments` | `packaging` | `jute` | `machinery` | `textiles` | `plastic`
  - `search` (optional): Keyword search for title, SKU, or manufacturer
  - `verified_only` (optional): `true` | `false`
  - `max_moq` (optional): Max Minimum Order Quantity
  - `sort` (optional): `price_asc` | `price_desc` | `moq_asc` | `featured`
- **Response:**
  ```json
  [
    {
      "id": "prod-1",
      "supplierId": "sup-1",
      "supplierName": "Apex Composite Knitwear Ltd.",
      "title": "180 GSM 100% Combed Ring-Spun Cotton Crewneck Blank T-Shirts",
      "category": "garments",
      "sku": "APX-TS-180-BLK",
      "moq": 500,
      "moqUnit": "Pieces",
      "pricingTiers": [
        { "minQty": 500, "maxQty": 1999, "unitPriceBDT": 285 },
        { "minQty": 2000, "unitPriceBDT": 220 }
      ],
      "leadTimeDays": 14,
      "stockStatus": "made_to_order"
    }
  ]
  ```

### `POST /api/products`
Create new industrial listing (Admin & Verified Suppliers).
- **Body:** Product schema definition.

### `PUT /api/products/:id`
Update an existing listing.

### `DELETE /api/products/:id`
Remove product from directory.

### `POST /api/products/bulk-import`
Upload CSV for batch product import.

---

## 3. Supplier Verification & Directory API

### `GET /api/suppliers`
List verified Bangladeshi manufacturers with industrial zone filtering (Gazipur, Narayanganj, Demra, Tejgaon, Chittagong EPZ).

### `GET /api/suppliers/:id`
Retrieve detailed factory profile, machinery inventory, audit credentials (NBR e-TIN, BIN, Trade License), and listed products.

### `PATCH /api/suppliers/:id/verification`
Admin action to approve, reject, or renew factory audit status.

---

## 4. RFQ & Quotation API

### `POST /api/rfqs`
Submit custom Request for Quotation.
- **Payload:**
  - `title`: string
  - `category`: string
  - `targetQuantity`: number
  - `targetUnit`: string
  - `targetBudgetBDT`: number
  - `specifications`: object
  - `attachments`: array of filenames
  - `deliveryDistrict`: string
  - `deadlineDate`: string (YYYY-MM-DD)

### `GET /api/rfqs`
List buyer inquiries. (Admins see all; buyers see own; suppliers see matching open RFQs).

### `POST /api/quotations`
Suppliers submit binding commercial quotes.
- **Payload:**
  - `rfqId`: string
  - `unitPriceBDT`: number
  - `totalAmountBDT`: number
  - `leadTimeDays`: number
  - `validityUntil`: string
  - `notes`: string
  - `paymentTerms`: string

### `POST /api/quotations/:id/pdf`
Generate official PDF quotation with digital seal, line-item pricing in BDT, VAT breakdown, and authorized signature.

---

## 5. Orders & Milestone Pipeline API

### `POST /api/orders`
Initialize production order upon quote acceptance.

### `PATCH /api/orders/:id/milestones`
Update manufacturing progress:
1. `order_confirmed`
2. `sample_approved`
3. `raw_material_sourced`
4. `in_production`
5. `qc_inspection` (AQL 2.5 standards)
6. `dispatched`
7. `delivered`

---

## 6. Visual Website Builder & Theme API

### `GET /api/config/website`
Retrieve current live visual layout, section ordering, hero copy, and theme settings.

### `POST /api/config/website/publish`
Publish draft website builder changes to the live storefront.

### `POST /api/config/website/rollback`
Rollback to previous published version.

---

## 7. Setup & Build from Clean Machine

1. **Prerequisites:** Node.js 20+ and npm.
2. **Install:**
   ```bash
   npm install
   ```
3. **Run Dev Server:**
   ```bash
   npm run dev
   ```
4. **Build Production Assets:**
   ```bash
   npm run build
   ```
5. **Docker Compose:**
   ```bash
   docker compose up --build -d
   ```
