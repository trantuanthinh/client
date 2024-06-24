import AddToCartButton from "@/components/AddToCartButton";

const fetchData = async (pathname) => {
    try {
        let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products`;
        let rest_api = { method: "GET" };
        const res = await fetch(
            `http://10.30.232.103:3000/api/products?filters[slug][$eq]=${pathname}&populate=*`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
                },
            }
        );
        const data = await res.json();
        return data.data[0];
    } catch (error) {
        console.log(error);
    }
};

export default async function page({ params }) {
    const data = await fetchData(params.slug);

    return (
        <div>
            <section>
                <div className="w-full flex justify-center items-center">
                    <div className="flex justify-between items-center w-[70%] px-2 py-3">
                        <div>
                            <img
                                src={`http://10.30.232.103:3000` + data?.attributes.image.data.attributes.url}
                                className="w-full h-[500px]"
                            />
                        </div>
                        <div className="text_detail">
                            <div>{data?.attributes.name}</div>
                            <div>{data?.attributes.regular_price}</div>
                            <div>{data?.attributes.description}</div>
                            <div>
                                <AddToCartButton variant="bordered" color="secondary" data={data}>
                                    Add To Cart
                                </AddToCartButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
