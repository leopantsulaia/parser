"use client";

import { useFormState, useFormStatus } from "react-dom";
import { searchProductsAction, type SearchState } from "./actions";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, TagIcon, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-75">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Searching...
        </>
      ) : (
        <>
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
        </>
      )}
    </Button>
  );
}

export default function HomePage() {
  const initialState: SearchState = null;
  const [state, formAction] = useFormState(searchProductsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && (state.message.includes("error") || state.message.includes("Please enter a product name"))) {
      toast({
        title: state.message.includes("error") ? "Error" : "Info",
        description: state.message,
        variant: state.message.includes("error") ? "destructive" : "default",
      });
    }
  }, [state?.message, state?.timestamp, toast]);


  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 selection:bg-primary/40 selection:text-foreground">
      <header className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center mb-2">
          <TagIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Price Wise
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Your smart way to find the best deals in Georgia.
        </p>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto">
        <form 
          ref={formRef}
          action={formAction} 
          className="mb-10 p-6 bg-card border border-border rounded-lg shadow-md"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Input
              type="search"
              name="productName"
              placeholder="Enter product name (e.g., Laptop, iPhone 15)"
              className="flex-grow text-base bg-background border-input focus:ring-ring focus:ring-2"
              aria-label="Product name"
              required
            />
            <SubmitButton />
          </div>
        </form>

        <div className="mt-6">
          {state === null && (
             <div className="text-center text-muted-foreground py-10">
                <SearchIcon className="mx-auto h-12 w-12 mb-4" />
                <p className="text-xl">Enter a product name above to start your search.</p>
                <p>We scan sites like Zoommer, Alta, EE.GE, and PCShop.ge for you!</p>
             </div>
          )}
          {state?.products && state.products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {state.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {state?.products && state.products.length === 0 && state.message && !state.message.includes("Please enter") &&(
            <div className="text-center text-muted-foreground py-10">
              <p className="text-xl">{state.message}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center mt-12 py-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Price Wise. All prices and product data are sourced from respective retailers.
        </p>
      </footer>
    </div>
  );
}
