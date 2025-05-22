# 👑 Empress E-commerce Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)

A sophisticated, full-stack e-commerce platform for luxury handcrafted jewelry. Empress features a modern React frontend with Next.js, powerful admin dashboard with Vite, and robust Node.js backend with comprehensive testing and performance monitoring.

## 🌟 Features

### 🛍️ Customer Experience
- **Elegant Product Catalog** - Browse curated collections (Heritage, Ethereal, Divine, Celestial Bloom)
- **Interactive Product Gallery** - High-quality image carousels with zoom functionality and quick view modals
- **Smart Search** - Real-time product search with autocomplete in navbar
- **Seamless Cart Management** - Add, update, and manage cart items with persistent storage
- **Secure Checkout** - Stripe integration for safe payments with CAD currency support
- **User Authentication** - Complete sign-up, sign-in, password recovery, and profile management
- **Responsive Design** - Optimized for all devices with Tailwind CSS v4
- **Custom Bracelet Designer** - Interactive bracelet customization tool

### 📊 Admin Dashboard
- **Product Management** - Full CRUD operations with image upload via Cloudinary
- **Collection Management** - Create and manage product collections with rich media
- **Customer Analytics** - View customer data, purchase history, and management tools
- **Inventory Tracking** - Real-time stock monitoring with low-stock notifications
- **Sales Dashboard** - Charts and analytics using MUI X Charts
- **Order Management** - Process customer orders and payment tracking
- **Material Management** - Add/remove product materials and specifications
- **Visibility Controls** - Toggle product visibility and manage featured items

### 🔧 Technical Excellence
- **Modern Architecture** - Monorepo structure with clear separation of concerns
- **Type Safety** - Modern JavaScript with ES6+ features and comprehensive validation
- **State Management** - React Query v5 for efficient server state management
- **Styling** - Tailwind CSS v4 with custom design system and Montserrat/Cabin fonts
- **Testing Suite** - Jest unit tests, Cypress E2E tests, and K6 performance tests
- **Image Optimization** - Cloudinary integration with auto-optimization and cropping
- **Email Services** - Mailtrap integration for transactional emails
- **Form Handling** - React Hook Form with comprehensive validation
- **Authentication** - JWT-based auth with role-based access control

## 🏗️ Architecture

```
empress-platform/
├── apps/
│   ├── empress-app/              # Customer-facing Next.js 15 application
│   ├── empress-admin-app/        # Admin dashboard Vite + React application
│   └── empress-backend/          # Node.js/Express REST API with MongoDB
├── performance-tests/            # K6 performance testing suite
└── cypress/                      # E2E testing configuration
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15, React 19 | Customer storefront with SSR |
| **Admin** | Vite, React 19, MUI | Admin dashboard with data grids |
| **Backend** | Node.js, Express, MongoDB | REST API with Mongoose ODM |
| **Database** | MongoDB Atlas | Document-based data storage |
| **Authentication** | JWT, bcrypt | Secure user sessions |
| **Payments** | Stripe | CAD payment processing |
| **Images** | Cloudinary | Image optimization & CDN |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design |
| **State** | React Query v5, Context API | Server & client state management |
| **Forms** | React Hook Form | Form validation & handling |
| **Testing** | Jest, Cypress, K6, MSW | Comprehensive testing suite |
| **Email** | Mailtrap, Nodemailer | Email delivery service |
| **Icons** | Lucide React, MUI Icons | Icon libraries |
| **Animations** | Framer Motion | Smooth UI animations |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** package manager
- **MongoDB** instance (local or MongoDB Atlas)
- **Cloudinary** account for image management
- **Stripe** account for payments
- **Mailtrap** account for emails

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/empress-platform.git
cd empress-platform
```

### 2. Install Dependencies

```bash
# Install dependencies for all applications
npm install

# Or install individually
cd apps/empress-app && npm install
cd ../empress-admin-app && npm install
cd ../empress-backend && npm install
```

### 3. Environment Setup

Create environment files for each application:

#### Backend Environment (`apps/empress-backend/.env`)

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/empress
MONGODB_DB_NAME=empress

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Cloudinary Configuration (Sign up at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Stripe Configuration (Get from stripe.com dashboard)
STRIPE_API_KEY=sk_test_your-stripe-secret-key

# Mailtrap Configuration (Sign up at mailtrap.io)
MAILTRAP_TOKEN=your-mailtrap-api-token
MAILTRAP_SENDER_EMAIL=noreply@yourdomain.com
MAILTRAP_SENDER_NAME=Empress

# Frontend URLs
CLIENT_URL=http://localhost:3000
YOUR_DOMAIN=http://localhost:3000
```

#### Frontend Environment (`apps/empress-app/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Admin Environment (`apps/empress-admin-app/.env.local`)

```env
VITE_API_URL=http://localhost:5000
```

### 4. Database Setup

Ensure MongoDB is running and accessible. The application will automatically create the necessary collections on first run.

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database (recommended)
# Update MONGODB_URI in .env with your Atlas connection string
```

### 5. Start the Development Servers

```bash
# Terminal 1: Start the backend server
cd apps/empress-backend
npm run dev
# Server runs on http://localhost:5000

# Terminal 2: Start the customer frontend
cd apps/empress-app
npm run dev
# App runs on http://localhost:3000

# Terminal 3: Start the admin dashboard
cd apps/empress-admin-app
npm run dev
# Admin runs on http://localhost:5173
```

### 6. Initial Admin Setup

Create your first admin account by making a POST request:

```bash
curl -X POST http://localhost:5000/api/auth/create/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@empress.com",
    "password": "AdminPassword123!",
    "confirmPassword": "AdminPassword123!"
  }'
```

Or use a tool like Postman/Thunder Client to make the request.

### 7. Access the Applications

- **Customer Store**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173
- **API Documentation**: http://localhost:5000

## 📁 Project Structure

### Customer App (`empress-app`)
```
src/
├── app/                    # Next.js 15 app directory
│   ├── about-us/          # About page with team info
│   ├── auth/              # Authentication pages (sign-in, sign-up, reset)
│   ├── bracelet-designer/ # Custom bracelet design tool
│   ├── cart/              # Shopping cart with Stripe integration
│   ├── collections/       # Product collections with filtering
│   ├── contexts/          # React contexts (auth, cart)
│   ├── faq/               # FAQ page with search
│   └── products/          # Product catalog and details
├── components/            # Reusable components
│   ├── chatbot/          # Botpress integration
│   ├── home/             # Homepage sections (hero, bestsellers, testimonials)
│   ├── layout/           # Layout components (header, footer)
│   ├── product/          # Product cards and galleries
│   └── ui/               # UI components (buttons, headings, navbar)
├── hooks/                # Custom React hooks (useProducts, useCollections, useCart)
├── lib/                  # Services and utilities
│   ├── auth-services.js  # Authentication API calls
│   ├── cart-services.js  # Cart management
│   ├── product-service.js # Product data fetching
│   └── backend-url.js    # API endpoint configuration
└── performance-tests/    # K6 performance testing scripts
```

### Admin App (`empress-admin-app`)
```
src/
├── contexts/             # React contexts (auth, state management)
├── features/            # Feature-based components
│   ├── collections/     # Collection CRUD with image uploads
│   ├── customer/        # Customer management and analytics
│   └── product/         # Product management with material handling
├── hooks/               # Custom hooks (useProducts, useCollections, useCustomers)
├── mocks/               # MSW mock service worker setup
├── pages/               # Page components
│   ├── AuthenticationPage.jsx
│   ├── CollectionPage.jsx
│   ├── CustomersPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProductDetailsPage.jsx
│   └── ProductPage.jsx
├── services/            # API service layer
│   ├── authentication.js
│   ├── collections.js
│   ├── customers.js
│   └── products.js
└── ui/                  # UI components (layout, modals, tables)
```

### Backend (`empress-backend`)
```
├── controllers/         # Route handlers
│   ├── admin.js        # Admin operations (products, collections, customers)
│   ├── auth.js         # Authentication (login, register, password reset)
│   └── customer.js     # Customer operations (cart, orders, profile)
├── models/             # Mongoose MongoDB models
│   ├── admin.js        # Admin user model
│   ├── collection.js   # Product collection model
│   ├── customer.js     # Customer model with cart
│   └── product.js      # Product model with images and ratings
├── routes/             # Express route definitions
│   ├── admin.js        # Admin-only routes
│   ├── auth.js         # Authentication routes
│   └── customer.js     # Customer routes
├── utils/              # Utilities and middleware
│   ├── helper.js       # Cloudinary image upload/delete
│   ├── middleware.js   # JWT authentication middleware
│   ├── deleteFile.js   # File cleanup utility
│   ├── serverResponse.js # Standardized API responses
│   └── rules/          # Validation rules for requests
└── index.js            # Express app entry point
```

## 🔧 API Configuration

### Authentication Endpoints
- `POST /api/auth/create/admin` - Create admin account
- `POST /api/auth/login/admin` - Admin login
- `POST /api/auth/create/customer` - Customer registration
- `POST /api/auth/login/customer` - Customer login
- `GET /api/auth/check/auth` - Verify authentication status
- `POST /api/auth/forgot/password` - Password reset request
- `POST /api/auth/reset/password` - Password reset with token

### Product Management (Admin)
- `GET /api/admin/products` - Get all products with full details
- `GET /api/admin/product/:productId` - Get single product
- `POST /api/admin/product/new` - Create new product
- `PUT /api/admin/product/update/:productId` - Update product
- `DELETE /api/admin/product/delete/:productId` - Delete product
- `PUT /api/admin/product/visibility/:productId` - Toggle visibility
- `PUT /api/admin/product/add-material/:productId` - Add material
- `DELETE /api/admin/product/remove-material/:productId` - Remove material
- `PUT /api/admin/product/add-images/:productId` - Upload images
- `DELETE /api/admin/product/remove-image/:productId` - Remove image

### Collection Management
- `GET /api/admin/collections` - Get all collections
- `GET /api/admin/collection/:collectionId` - Get single collection
- `POST /api/admin/collection/new` - Create collection (with image upload)
- `PUT /api/admin/collection/update/:collectionId` - Update collection
- `DELETE /api/admin/collection/delete/:collectionId` - Delete collection
- `PUT /api/admin/collection/add-product/:collectionId` - Add product to collection
- `DELETE /api/admin/collection/remove-product/:collectionId` - Remove product

### Customer Operations
- `GET /api/customer/products` - Get visible products only
- `POST /api/customer/cart` - Add item to cart
- `GET /api/customer/cart` - Get cart with populated product details
- `PUT /api/customer/cart/:productId` - Update cart item quantity
- `DELETE /api/customer/cart/:productId` - Remove item from cart
- `POST /api/customer/payment` - Create Stripe checkout session
- `PUT /api/customer/update/details` - Update customer profile
- `PUT /api/customer/update/password` - Change password

### Customer Management (Admin)
- `GET /api/admin/customers` - Get all customers
- `GET /api/admin/customer/:customerId` - Get single customer
- `DELETE /api/admin/customer/delete/:customerId` - Delete customer
- `GET /api/admin/notifications` - Get low stock alerts

## 🧪 Testing

### Running Tests

```bash
# Unit Tests (Jest) - All Apps
npm run test                    # Run all tests
npm run test:watch             # Run tests in watch mode
npm run test:coverage          # Generate coverage report

# Component-specific tests
npm run test:components        # Test UI components
npm run test:about-us         # Test about page
npm run test:authentication  # Test auth flows
npm run test:cart            # Test cart functionality
npm run test:hooks           # Test custom hooks
npm run test:library         # Test utility functions

# E2E Tests (Cypress) - Customer App
cd apps/empress-app
npm run cypress:open          # Open Cypress GUI
npm run cypress:run           # Run Cypress headlessly

# Performance Tests (K6) - Customer App
npm run perf:homepage         # Test homepage performance
npm run perf:journey          # Test complete user journey
npm run perf:api              # Test API endpoints
npm run perf:load             # Load testing with multiple users
npm run perf:auth             # Test authenticated flows
npm run perf:all              # Run comprehensive performance suite
```

### Test Coverage

- **Admin App**: Jest unit tests with MSW mocking
- **Customer App**: Jest + Cypress E2E + K6 performance
- **Backend**: API testing through frontend integration tests

### Test Files Structure

```
# Unit Tests
src/**/__tests__/             # Component tests
src/**/__test__/              # Feature tests

# E2E Tests
cypress/e2e/
├── browse_products.cy.js     # Product browsing flow
├── checkout_flow.cy.js       # Purchase process
├── homepage.cy.js            # Homepage functionality
├── navigation.cy.js          # Navigation components
└── product-interactions.cy.js # Product interactions

# Performance Tests
performance-tests/
├── homepage-test.js          # Homepage load testing
├── user-journey.js           # Complete user flow
├── api-test.js               # API endpoint testing
├── load-test.js              # Multi-user scenarios
└── authenticated-test.js     # Auth flow testing
```

## 🚀 Deployment

### Production Build

```bash
# Build all applications
npm run build

# Or build individually
cd apps/empress-app && npm run build
cd apps/empress-admin-app && npm run build
cd apps/empress-backend && npm run build
```

### Environment Variables for Production

#### Backend Production Environment
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/empress
JWT_SECRET=your-production-jwt-secret-minimum-32-characters
CLIENT_URL=https://yourdomain.com
YOUR_DOMAIN=https://yourdomain.com
STRIPE_API_KEY=sk_live_your-production-stripe-key
```

#### Frontend Production Environment
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Deployment Options

#### Option 1: Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy customer app
cd apps/empress-app
vercel

# Deploy admin app
cd apps/empress-admin-app
vercel

# Configure environment variables in Vercel dashboard
```

#### Option 2: Railway/Render (Backend)
```bash
# Connect your GitHub repository
# Set environment variables in dashboard
# Deploy automatically on push
```

#### Option 3: Docker Containerization
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎨 Customization

### Branding & Design System

The platform uses a sophisticated design system with custom colors and typography:

```css
/* Primary Brand Colors */
--primary: #11296B      /* Deep blue for headers and CTAs */
--secondary: #1E96FC    /* Bright blue for accents */
--accent: #FFC300      /* Golden yellow for highlights */

/* Typography */
--font-montserrat: 'Montserrat', sans-serif  /* Headers and UI */
--font-cabin: 'Cabin', sans-serif            /* Body text */
```

### Update Brand Assets

1. **Replace Logo Files**:
   ```
   public/icons/empress_logo.png           # Main logo
   public/icons/empress_logo_white.png     # White variant
   ```

2. **Update Favicon**:
   ```
   public/empress_logo.png                 # Browser favicon
   ```

3. **Modify Color Scheme**:
   ```javascript
   // tailwind.config.js
   theme: {
     extend: {
       colors: {
         primary: '#YOUR_PRIMARY_COLOR',
         secondary: '#YOUR_SECONDARY_COLOR',
         accent: '#YOUR_ACCENT_COLOR'
       }
     }
   }
   ```

### Adding New Product Collections

1. **Create Collection via Admin Dashboard**
2. **Add Collection Images to Cloudinary**
3. **Update Collection Navigation** in `src/components/ui/navbar.js`

### Custom Features

#### Adding New Product Fields
```javascript
// Update backend model
// apps/empress-backend/models/product.js
const productSchema = new mongoose.Schema({
  // existing fields...
  newField: {
    type: String,
    required: false,
    default: ''
  }
});
```

#### Adding New Admin Features
```javascript
// Create new feature component
// apps/empress-admin-app/src/features/new-feature/
```

## 🔍 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Errors
```bash
# Local MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Linux

# Check connection
mongo --eval "db.adminCommand('ismaster')"
```

#### 2. Port Conflicts
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

#### 3. Environment Variables Not Loading
- Ensure `.env` files are in correct directories
- Restart development servers after changes
- Check for typos in variable names
- Verify file permissions

#### 4. Cloudinary Upload Failures
- Verify API credentials in Cloudinary dashboard
- Check upload presets and permissions
- Ensure file size limits are appropriate
- Review CORS settings

#### 5. Stripe Payment Issues
- Use test keys in development
- Check webhook endpoints
- Verify currency settings (CAD)
- Review payment methods configuration

#### 6. Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Clear Vite cache
rm -rf node_modules/.vite
```

### Debug Mode

Enable comprehensive logging:

```env
# Backend debugging
DEBUG=empress:*
NODE_ENV=development

# Frontend debugging (Next.js)
NEXT_DEBUG=true

# Admin debugging (Vite)
VITE_DEBUG=true
```

### Performance Issues

#### Frontend Optimization
- Enable image optimization in `next.config.mjs`
- Use React.memo for expensive components
- Implement code splitting with dynamic imports
- Optimize Tailwind CSS build

#### Backend Optimization
- Add database indexes for frequent queries
- Implement Redis caching
- Use MongoDB aggregation pipelines
- Enable compression middleware

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation
4. **Test Changes**
   ```bash
   npm run test
   npm run test:coverage
   ```
5. **Commit Changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open Pull Request**

### Coding Standards

- **JavaScript**: ES6+ features, no TypeScript conversion needed
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes only
- **Testing**: Jest for units, Cypress for E2E
- **Commits**: Conventional commit messages

### Code Review Process

1. Ensure all tests pass
2. Verify responsive design works
3. Check accessibility standards
4. Review performance impact
5. Validate security considerations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Resources

- **Documentation**: Available in repository wiki
- **Issues**: Report bugs via GitHub Issues
- **Feature Requests**: Use GitHub Discussions
- **Security Issues**: Email security@yourdomain.com

### External Service Documentation

- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Cloudinary**: [cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Mailtrap**: [mailtrap.io/docs](https://mailtrap.io/docs)
- **React Query**: [tanstack.com/query](https://tanstack.com/query)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vercel** - For Next.js and deployment platform  
- **MongoDB** - For the flexible document database
- **Stripe** - For secure payment processing
- **Cloudinary** - For image optimization services
- **Tailwind Labs** - For the utility-first CSS framework
- **Testing Library** - For simple and complete testing utilities

---

**Built with ❤️ for elegant e-commerce experiences**

*Empress Platform - Where technology meets luxury retail*
