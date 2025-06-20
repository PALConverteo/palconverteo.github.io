# Mock E-commerce Website for Analytics Demonstration

This project is a mock e-commerce website built to serve as a practical, hands-on example for implementing and testing various web analytics and marketing technology tools. The site is styled to mimic a clean, modern "2025 Shopify store" and is intended to be hosted on GitHub Pages.

The primary purpose of this repository is to showcase a complete and realistic data collection setup for a typical e-commerce purchasing funnel.

## Core Features

- **Modern UI**: A clean, responsive, and aesthetically pleasing user interface built with vanilla HTML, CSS, and JavaScript.
- **Dynamic Content**: Product listings and product detail pages are rendered dynamically from a mock product catalog (`assets/js/product-data.js`).
- **Modular Header**: The site's navigation header is stored in a single file (`header.html`) and injected into all pages using JavaScript, ensuring maintainability.
- **Shopping Cart**: A persistent shopping cart powered by `sessionStorage` allows users to add items and proceed through the checkout flow.
- **User Authentication**: A mock login/logout system that stores a hashed `user_id` in `sessionStorage` to simulate a logged-in user experience.

## Analytics & Tracking Implementation

This project features a comprehensive, multi-layered analytics stack designed to be as close to a real-world scenario as possible.

### 1. Consent Management
- **Axeptio CMP**: Integrated via a custom script loader to manage user consent for tracking, a critical first step in any modern data collection strategy.

### 2. Google Tag Manager (GTM)
- **GTM Container**: The standard GTM container snippet is present on all pages, serving as the central hub for deploying other tracking tags.

### 3. GA4 E-commerce DataLayer
A complete Google Analytics 4 e-commerce dataLayer is implemented across the entire user journey:
- `page_view`: Fired on every page load, enriched with `page_category` and `user_id` (when available).
- `view_item_list`: Fired on the homepage and product listing page.
- `select_item`: Fired when a user clicks on a product.
- `view_item`: Fired on product detail pages.
- `add_to_cart`: Fired when a user adds an item to their cart.
- `begin_checkout`: Fired when a user lands on the checkout page.
- `purchase`: Fired on the order confirmation page after a successful transaction.

### 4. Amplitude Integration
- **Experiment**: The Amplitude Experiment script is included for running A/B tests. An example of a dynamically injected test banner was used for debugging.
- **Analytics**: A GTM tag is configured to initialize the Amplitude SDK, set the `user_id`, and track a `page_view` event, demonstrating how to integrate Amplitude through a tag manager.

### 5. Enriched Data
- A helper function, `enrichDataLayer()`, automatically adds the `user_id` to all dataLayer events when a user is logged in, ensuring data consistency.

## Pages & Funnel Flow

1.  **Home (`index.html`)**: Displays featured products.
2.  **Products (`products.html`)**: Shows a full grid of all available products.
3.  **Product Detail (`product.html`)**: Displays information for a single product.
4.  **Cart (`cart.html`)**: Shows the contents of the shopping cart.
5.  **Checkout (`checkout.html`)**: A multi-column form for shipping and payment information.
6.  **Order Confirmation (`confirmation.html`)**: A "Thank You" page displayed after a successful order, where the final `purchase` event is tracked. 