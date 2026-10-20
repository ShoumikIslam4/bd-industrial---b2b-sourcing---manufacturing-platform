# BD-Industrial Platform — REST API & RBAC Specification

This document details the RESTful endpoints, role-based authorization requirements, request/response structures, and error codes for the BD-Industrial B2B Manufacturing Platform.

---

## 1. Authentication & Role-Based Access Control (RBAC)

All mutating endpoints require an authenticated session and role validation passed via standard Bearer token or authenticated user session.

### Roles & Permission Matrix
| Role | Read Products | Create/Edit Products | Post RFQ | Submit Quotes | Verify Suppliers | CMS & Website Builder | User Roles |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `superadmin` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `admin` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `supplier` | ✅ | ✅ (Own) | ❌ | ✅ | ❌ | ❌ | ❌ |
| `buyer` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `guest` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 2. Authentication Endpoints

### `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "admin@bdsource.com.bd",
    "password": "admin123456"
  }
  ```
- **Success (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": "user-admin-1",
      "email": "admin@bdsource.com.bd",
      "name": "Tariq Rahman",
      "role": "superadmin",
      "companyName": "BD-Industrial National Platform HQ"
    }
  }
  ```

### `POST /api/auth/logout`
- **Access:** Authenticated
- **Success (200 OK):** `{"success": true, "message": "Signed out successfully"}`

---

## 3. Product Catalog Endpoints

### `GET /api/products`
- **Access:** Public
- **Query Params:** `category`, `search`, `min_moq`, `max_moq`, `verified_only`
- **Success (200 OK):** Array of `Product` objects.

### `POST /api/products`
- **Access:** `superadmin`, `admin`, `supplier`
- **Request Body:**
  ```json
  {
    "title": "5-Ply Export Corrugated Master Carton",
    "category": "packaging",
    "subCategory": "Corrugated Cartons",
    "sku": "BD-PCK-2026-002",
    "moq": 1000,
    "moqUnit": "Boxes",
    "pricingTiers": [
      { "minQty": 1000, "maxQty": 4999, "unitPriceBDT": 68 },
      { "minQty": 5000, "unitPriceBDT": 62 }
    ],
    "leadTimeDays": 7,
    "specifications": { "ECT": "44", "Flute": "BC Flute" }
  }
  ```

### `PUT /api/products/:id`
- **Access:** `superadmin`, `admin`, or owning `supplier`

### `DELETE /api/products/:id`
- **Access:** `superadmin`, `admin`, or owning `supplier`

### `POST /api/products/bulk-import`
- **Access:** `superadmin`, `admin`
- **Request:** Multi-part CSV file upload.

---

## 4. Supplier Verification Endpoints

### `GET /api/suppliers`
- **Access:** Public
- **Success (200 OK):** Array of verified manufacturers.

### `PATCH /api/suppliers/:id/verification`
- **Access:** `superadmin`, `admin`
- **Request Body:**
  ```json
  {
    "verified": true,
    "verificationExpiresAt": "2027-12-31"
  }
  ```

---

## 5. RFQs & Quotations Endpoints

### `POST /api/rfqs`
- **Access:** `buyer`, `superadmin`
- **Request Body:**
  ```json
  {
    "title": "15,000 Pcs Combed Cotton Hoodies with GOTS Certification",
    "category": "garments",
    "targetQuantity": 15000,
    "targetUnit": "Pieces",
    "targetBudgetBDT": 8500000,
    "deliveryDistrict": "Dhaka",
    "deadlineDate": "2026-11-30"
  }
  ```

### `POST /api/quotations`
- **Access:** `supplier`, `superadmin`
- **Request Body:**
  ```json
  {
    "rfqId": "rfq-101",
    "unitPriceBDT": 540,
    "totalAmountBDT": 8100000,
    "leadTimeDays": 25,
    "validityUntil": "2026-12-31",
    "paymentTerms": "30% Advance, 70% against B/L"
  }
  ```

### `POST /api/quotations/:id/pdf`
- **Access:** Authenticated buyer or supplier
- **Response:** Binary PDF stream (application/pdf).

---

## 6. Visual Website Builder Endpoints

### `GET /api/config/website`
- **Access:** Public
- **Response:** JSON object of hero copy, active sections, theme colors, and announcement bar.

### `PUT /api/config/website/draft`
- **Access:** `superadmin`
- **Request Body:** Partial `WebsiteBuilderConfig`.

### `POST /api/config/website/publish`
- **Access:** `superadmin`
- **Response:** Published configuration state.

### `POST /api/config/website/rollback`
- **Access:** `superadmin`
- **Response:** Reverted configuration state.

---

## 7. Audit Logging Endpoints

### `GET /api/audit-logs`
- **Access:** `superadmin`
- **Response:** Chronological activity stream of administrative changes.
