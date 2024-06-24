"use client";
import environment from "@/app/environment/environment";
import AddToCartButton from "@/components/AddToCartButton";
import { Card, CardBody, CardFooter, Pagination, Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const ITEMS_PER_PAGE = 6;

export default function shopPage() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const { push } = useRouter();

  // function getProdPhotoURL(nameImg) {
  //   // return `http://10.30.232.103:3000/api/prod_photo/${nameImg}`;
  // }

  useEffect(() => {
    const cate = pathname.split("/")[2];
    const fetchData = async () => {
      try {
        let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products/category/${cate}`;
        let rest_api = { method: "GET" };
        const res = await fetch(api_url, rest_api);
        const dataCate = await res.json();
        setData(
          dataCate.data.map((product) => ({
            ...product,
            src: getProdPhotoURL(product.image),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pathname]);

  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data ? data.slice(startIndex, endIndex) : [];
  function getProdPhotoURL(nameImg) {
    return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/prod_photo/${nameImg}`;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-2 py-3">
        {data &&
          paginatedData.map((product) => (
            <Card
              shadow="sm"
              key={product.id}
              isPressable={false}
              onPress={() => {
                if (product.attributes && product.attributes.slug) {
                  push(`/product/${product.attributes.slug}`);
                }
              }}
            >

              <CardBody className="overflow-visible p-0">
                {product.src && (
                  <img
                    className="w-full h-auto"
                    src={getProdPhotoURL(product.image)}
                  />
                )}
              </CardBody>
              <CardFooter className="text-small justify-between gap-2">
                <b className="truncate">{product.name}</b>
                <p className="text-default-500">${product.price}</p>
                <div className="flex flex-row w-full justify-end">
                  <AddToCartButton
                    variant="bordered"
                    color="secondary"
                    data={product}
                  >
                    Add To Cart
                  </AddToCartButton>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      <div className="flex flex-col items-center mt-4 gap-2">
        <Pagination
          total={totalPages}
          color="secondary"
          page={currentPage}
          onChange={setCurrentPage}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          >
            Next
          </Button>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
