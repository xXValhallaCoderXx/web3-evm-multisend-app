import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const tokenSymbol = query.get("token");

  if (!tokenSymbol) {
    return NextResponse.json(
      { message: "No token symbol provided" },
      { status: 400 }
    );
  }
  let apiResponse = null;
  try {
    // const response = await fetch(
    //   `https://api.coinbase.com/v2/prices/${tokenSymbol}-USD/spot`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );
    // const parsedResponse = await response.json();

    // apiResponse = {
    //   price: parsedResponse.data.amount,
    //   currency: parsedResponse.data.currency,
    //   token: parsedResponse.data.base,
    // };
    apiResponse = {
      price: "2491.825",
      currency: "USD",
      token: tokenSymbol,
    };
  } catch (err) {
    console.log("ERROR");
    return NextResponse.json({ message: "Hello World" }, { status: 500 });
  }
  // Do whatever you want
  return NextResponse.json({ ...apiResponse }, { status: 200 });
}
