import { NextResponse } from "next/server";
import { getProduct, getApiKey } from "@/lib/lemon-squeezy";

export async function POST(request: Request) {
  try {
    const { productSlug } = await request.json();

    if (!productSlug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    const product = getProduct(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const apiKey = getApiKey();
    if (!apiKey || !product.variantId) {
      return NextResponse.json(
        {
          error: "Payment not configured",
          message:
            "This product is not yet available for purchase. Please check back soon or contact me directly.",
        },
        { status: 503 }
      );
    }

    const storeId = process.env.LS_STORE_ID;
    if (!storeId) {
      return NextResponse.json(
        { error: "Store not configured" },
        { status: 503 }
      );
    }

    const origin = request.headers.get("origin") || "https://danielkliewer.com";

    const response = await fetch(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              product_variant_id: Number(product.variantId),
              checkout_data: {
                custom_price: null,
                discount_code: null,
              },
              success_url: `${origin}/checkout/success`,
              cancel_url: `${origin}/checkout/cancel`,
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: storeId,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: product.variantId,
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("LemonSqueezy error:", err);
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ url: data.data.attributes.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
