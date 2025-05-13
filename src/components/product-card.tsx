import type { Product } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <a 
      href={product.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block hover:shadow-green-500/30 transition-shadow duration-300 rounded-lg"
      aria-label={`View ${product.name} on ${product.websiteName}`}
    >
      <Card className="h-full flex flex-col bg-card text-card-foreground border-border shadow-lg hover:border-primary transition-colors duration-300">
        <CardHeader>
          {product.imageUrl && (
            <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint="product item"
              />
            </div>
          )}
          <CardTitle className="text-lg font-semibold leading-tight">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{product.websiteName}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-xl font-bold text-primary">{product.price}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View Product <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </a>
  );
}
