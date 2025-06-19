# FoodWagen - Food Management Application

A modern, full-stack food management application built with Next.js 15, featuring a beautiful UI for managing meals with full CRUD operations, real-time search, and responsive design.

## 🚀 Features

- **🍔 Meal Management**: Full CRUD operations (Create, Read, Update, Delete) for food items
- **🔍 Real-time Search**: Search meals by name with instant results
- **📱 Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **🎨 Modern UI**: Beautiful interface built with Shadcn/ui components
- **⚡ Real-time Updates**: Automatic UI updates using TanStack Query
- **🔔 Toast Notifications**: User feedback for all operations
- **📝 Form Validation**: Comprehensive validation using Zod and React Hook Form
- **🎯 Type Safety**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

### **Core Framework**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router for modern web development
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[React 19](https://react.dev/)** - Latest React features and concurrent rendering

### **State Management**
- **[TanStack Query v5](https://tanstack.com/query)** - Server state management, caching, and data fetching
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight global state management for client state

### **UI & Styling**
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework for rapid styling
- **[Shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable SVG icons
- **[Class Variance Authority](https://cva.style/)** - Type-safe component variants

### **Forms & Validation**
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with minimal re-renders
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolver for React Hook Form

### **User Experience**
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications for user feedback
- **[Next.js Image](https://nextjs.org/docs/api-reference/next/image)** - Optimized image loading

## 🏗️ Architecture & Design Decisions

### **Why TanStack Query?**
```typescript
// Automatic caching, background updates, and error handling
const { data: foodItems, isLoading, error } = useGetFoodItems()
```
- **Server State Management**: Handles API data with intelligent caching
- **Background Updates**: Keeps data fresh automatically
- **Optimistic Updates**: Instant UI feedback with automatic rollback on errors
- **Request Deduplication**: Prevents unnecessary API calls
- **Error Handling**: Built-in error states and retry logic

### **Why Zustand?**
```typescript
// Simple, lightweight global state
const useFoodStore = create((set) => ({
  foodItems: [],
  setFoodItems: (foodItems) => set({ foodItems }),
}))
```
- **Minimal Boilerplate**: No providers or complex setup
- **TypeScript First**: Excellent TypeScript integration
- **Small Bundle Size**: ~2.5kb vs Redux's ~20kb+
- **Simple API**: Easy to learn and use

### **Why Shadcn/ui?**
- **Accessibility**: WCAG compliant components out of the box
- **Customizable**: Copy-paste components you can modify
- **Consistent Design**: Professional, modern component system
- **Type Safe**: Full TypeScript support

### **Why Form Validation with Zod?**
```typescript
const addMealSchema = z.object({
  name: z.string().min(1, 'Field name is required'),
  rating: z.string().min(1, 'Food rating is required'),
  avatar: z.string().url('Please enter a valid image URL'),
})
```
- **Type Safety**: Auto-generated TypeScript types
- **Runtime Validation**: Catches errors before API calls
- **User Experience**: Instant feedback with clear error messages

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Shadcn theme
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx          # Home page with featured meals
├── components/
│   ├── common/           # Reusable components
│   │   ├── Header.tsx    # Navigation with Add Meal button
│   │   ├── Footer.tsx    # Footer with links and newsletter
│   │   └── AddMeal.tsx   # Add meal dialog form
│   ├── features/         # Feature-specific components
│   │   ├── LandingSection.tsx  # Hero section with search
│   │   ├── FeaturedMeals.tsx   # Meals grid layout
│   │   ├── MealCard.tsx        # Individual meal card
│   │   ├── EditMeal.tsx        # Edit meal dialog
│   │   └── DeleteMeal.tsx      # Delete confirmation dialog
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── providers.tsx     # TanStack Query and Toast providers
│   ├── query-client.ts   # API client configuration
│   └── utils.ts          # Utility functions
├── queries/
│   └── food/            # Food-related API operations
│       ├── index.ts     # Exports all food operations
│       ├── queries.ts   # GET operations and search
│       ├── mutations.ts # CREATE, UPDATE, DELETE operations
│       └── types.ts     # TypeScript interfaces
└── store/
    └── food-store.ts    # Zustand store for food state
```

## 🔄 Data Flow

### **1. API Layer**
```typescript
// Generic API client with error handling
export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  if (!response.ok) throw new Error(`API Error: ${response.status}`)
  return response.json()
}
```

### **2. TanStack Query Hooks**
```typescript
// GET all food items
export const useGetFoodItems = () => useQuery({
  queryKey: foodQueryKeys.lists(),
  queryFn: () => apiClient<FoodResponse>('/Food'),
})

// Search food items
export const useSearchFoodItems = (searchTerm?: string) => useQuery({
  queryKey: foodQueryKeys.search(searchTerm),
  queryFn: () => apiClient<FoodResponse>(`/Food?name=${searchTerm}`),
})

// Create food item
export const useCreateFoodItem = () => useMutation({
  mutationFn: (data: CreateFoodData) => apiClient<FoodItem>('/Food', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: foodQueryKeys.all }),
})
```

### **3. Zustand Store Integration**
```typescript
// Update store when API data changes
useEffect(() => {
  if (foodItemsData) {
    setFoodItems(foodItemsData)
  }
}, [foodItemsData, setFoodItems])
```

## 🎨 UI Components

### **Theme Configuration**
```css
/* Custom primary color (#FFB30E) integrated into Shadcn theme */
:root {
  --primary: oklch(0.8 0.15 85);  /* #FFB30E in OKLCH format */
  --primary-foreground: oklch(0.1 0 0);
}
```

### **Component Architecture**
- **Atomic Design**: Small, reusable components
- **Compound Components**: Complex components built from smaller parts
- **Props Interface**: Clear TypeScript interfaces for all props
- **Responsive Design**: Mobile-first approach with Tailwind classes

## 🔧 API Integration

### **MockAPI Backend**
- **Base URL**: `https://6852821e0594059b23cdd834.mockapi.io`
- **Endpoints**:
  - `GET /Food` - Get all meals
  - `GET /Food?name={search}` - Search meals
  - `GET /Food/{id}` - Get specific meal
  - `POST /Food` - Create new meal
  - `PUT /Food/{id}` - Update meal
  - `DELETE /Food/{id}` - Delete meal

### **Data Models**
```typescript
interface FoodItem {
  id: string
  createdAt: string
  name: string
  avatar: string      // Food image URL
  rating: string
  open: boolean      // Restaurant status
  logo: string       // Restaurant logo URL
  Price: string
}
```

## 🚦 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eskalate-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_FOOD_API_BASE_URL=https://6852821e0594059b23cdd834.mockapi.io
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

### **Build for Production**
```bash
npm run build
npm run start
```

### **Available Scripts**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Key Features in Detail

### **1. Search Functionality**
- Real-time search as you type
- Debounced API calls for performance
- Search results update the global state
- Clear search option

### **2. CRUD Operations**
- **Create**: Add new meals with validation
- **Read**: Display meals in responsive grid
- **Update**: Edit existing meals with pre-populated forms
- **Delete**: Confirmation dialog before deletion

### **3. Form Validation**
- Required field validation
- URL validation for images
- Real-time error feedback
- Accessible error messages

### **4. State Management**
- Server state managed by TanStack Query
- Client state managed by Zustand
- Automatic cache invalidation
- Optimistic updates

### **5. User Experience**
- Loading states for all operations
- Success/error toast notifications
- Responsive design for all screen sizes
- Keyboard navigation support

## 🎨 Design System

### **Colors**
- **Primary**: #FFB30E (Brand orange)
- **Success**: Green variants for open status
- **Error**: Red variants for delete actions
- **Neutral**: Gray scale for text and backgrounds

### **Typography**
- **Font Family**: Geist Sans (Optimized by Next.js)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### **Spacing**
- Consistent spacing using Tailwind's spacing scale
- Component padding and margins follow 4px grid system

## 🔒 Type Safety

### **Strict TypeScript Configuration**
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

### **API Type Safety**
```typescript
// All API responses are typed
const { data } = useGetFoodItems() // data is typed as FoodItem[]
const mutation = useCreateFoodItem() // Expects CreateFoodData
```

## 🚀 Performance Optimizations

### **Next.js Features**
- **App Router**: Latest Next.js routing with layouts
- **Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic code splitting for optimal bundle sizes

### **TanStack Query Features**
- **Intelligent Caching**: Reduces unnecessary API calls
- **Background Updates**: Keeps data fresh without blocking UI
- **Request Deduplication**: Prevents duplicate requests

### **Bundle Optimization**
- **Tree Shaking**: Remove unused code
- **Dynamic Imports**: Load components when needed
- **Optimized Dependencies**: Minimal bundle impact

## 📱 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, TanStack Query, and Shadcn/ui
