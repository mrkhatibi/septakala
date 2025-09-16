import Spinner from "@/modules/loader/Loader";
import Products from "@/modules/ProductsPages";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <Products />
      </Suspense>
    </div>
  );
}
