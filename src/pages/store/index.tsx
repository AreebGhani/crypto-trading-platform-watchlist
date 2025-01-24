// pages/shop/index.tsx
import React, { useEffect, useState } from "react";
import Layout from "@/layouts/Default";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEcommerceStore } from "@/stores/user/ecommerce";
import Card from "@/components/elements/base/card/Card";
import { MashImage } from "@/components/elements/MashImage";
import { capitalize } from "lodash";
import Input from "@/components/elements/form/input/Input";
import { HeroParallax } from "@/components/ui/HeroParallax";
import Tag from "@/components/elements/base/tag/Tag";
import { HeaderCardImage } from "@/components/widgets/HeaderCardImage";
import { useRouter } from "next/router";
import Button from "@/components/elements/base/button/Button";
import { Faq } from "@/components/pages/knowledgeBase/Faq";
import { useTranslation } from "next-i18next";
import IconButton from "@/components/elements/base/button-icon/IconButton";
import { useDashboardStore } from "@/stores/dashboard";
import { $serverFetch } from "@/utils/api";

interface Props {
  categories: any[];
  error?: string;
}

const Shop: React.FC<Props> = ({ categories, error }) => {
  const { t } = useTranslation();
  const { profile } = useDashboardStore();
  const router = useRouter();
  const {
    wishlist,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistFetched,
  } = useEcommerceStore();
  const [displayLimit, setDisplayLimit] = useState<number>(9);

  useEffect(() => {
    if (router.isReady && !wishlistFetched) {
      fetchWishlist();
    }
  }, [router.isReady, wishlistFetched]);

  const loadMore = () => {
    setDisplayLimit(displayLimit + 9);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleWishlistToggle = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const allCategoriesProducts = categories?.length
    ? categories.flatMap((category) =>
        category.products.map((product) => ({
          ...product,
          category: {
            id: category.id,
            name: category.name,
            slug: category.slug,
          },
        }))
      )
    : [];

  const filteredProducts = allCategoriesProducts
    .slice(0, displayLimit)
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  return (
    <Layout title={t("Shop")}>
      {allCategoriesProducts.length > 7 ? (
        <HeroParallax
          items={allCategoriesProducts.map((product) => ({
            title: product.name,
            link: `/store/${product?.category.slug}/${product.slug}`,
            thumbnail: product.image,
          }))}
          title={
            <>
              <span className="text-primary-500">
                {t("Welcome to our Online Store")}
              </span>
              <br />
            </>
          }
          description={
            <>
              <span className="text-muted-500 dark:text-muted-400">
                {t("Explore our wide range of products")}
              </span>
              <br />
              <span className="text-muted-500 dark:text-muted-400">
                {t("and find the perfect one for you")}
              </span>
            </>
          }
        />
      ) : (
        <div className="mb-5">
          <HeaderCardImage
            title={t("Welcome to our Online Store")}
            description="Explore our wide range of products and find the perfect one for you"
            lottie={{
              category: "ecommerce",
              path: "delivery",
              max: 2,
              height: 220,
            }}
            size="lg"
            link={profile ? `/user/store` : undefined}
            linkLabel={t("View Your Orders")}
          />
        </div>
      )}
      <div>
        {/* Categories Carousel */}
        {categories.length > 0 && (
          <div className="mt-5 mb-5">
            <div className="relative mb-6">
              <hr className="border-muted-200 dark:border-muted-700" />
              <span className="absolute inset-0 -top-2 text-center font-semibold text-xs text-muted-500 dark:text-muted-400">
                <span className="bg-muted-50 dark:bg-muted-900 px-2">
                  {t("Categories")}
                </span>
              </span>
            </div>
            <Swiper
              modules={[EffectCoverflow]}
              effect={"coverflow"}
              centeredSlides={true}
              grabCursor={true}
              loop={true} // Enables looping
              slidesPerView={3} // Visible slides, including the active one
              spaceBetween={30} // Space between slides
              coverflowEffect={{
                rotate: 0,
                stretch: 0, // No stretching for proper sizing
                depth: 120, // Distance between slides in z-axis
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1, // Single slide on small screens
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2, // Two slides on medium screens
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 3, // Three slides on large screens
                  spaceBetween: 20,
                },
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index} className="slide-item">
                  <Link href={`/store/${category.slug}`} passHref>
                    <div className="group transition duration-300 ease-in-out transform hover:-translate-y-1">
                      <div className="relative w-full h-[150px]">
                        <MashImage
                          src={category.image || "/img/placeholder.svg"}
                          alt={category.slug}
                          className="object-cover w-full h-full bg-muted-100 dark:bg-muted-900 rounded-lg"
                          fill
                        />
                      </div>
                      <div>
                        <div className="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50 rounded-lg"></div>
                        <div className="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6">
                          <h3 className="font-sans text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                            {category.name}
                          </h3>
                          <h3 className="font-sans text-sm text-white underline opacity-0 transition-all duration-300 group-hover:opacity-100">
                            {t("View products")}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
          <h2 className="text-2xl">
            <span className="text-primary-500">{capitalize("All")}</span>{" "}
            <span className="text-muted-800 dark:text-muted-200">
              {t("Products")}
            </span>
          </h2>

          <div className="flex gap-2 w-full sm:max-w-xs text-end">
            <Input
              type="text"
              placeholder={t("Search Products...")}
              value={searchTerm}
              onChange={handleSearchChange}
              icon={"mdi:magnify"}
            />
          </div>
        </div>
        <div className="relative my-5">
          <hr className="border-muted-200 dark:border-muted-700" />
          <span className="absolute inset-0 -top-2 text-center font-semibold text-xs text-muted-500 dark:text-muted-400">
            <span className="bg-muted-50 dark:bg-muted-900 px-2">
              {searchTerm ? `Matching "${searchTerm}"` : `All Products`}
            </span>
          </span>
        </div>
        {/* Products */}
        {filteredProducts.length > 0 && (
          <div className="grid gap-x-3 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group">
                <Link href={`/store/${product.category.slug}/${product.slug}`}>
                  <Card
                    className="group relative w-full h-full p-3 hover:shadow-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-400"
                    color="contrast"
                  >
                    <div className="relative w-full h-[200px]">
                      <MashImage
                        src={product.image || "/img/placeholder.svg"}
                        alt={product.slug}
                        className="rounded-md object-cover w-full h-full bg-muted-100 dark:bg-muted-900"
                      />
                      <div className="absolute top-1 left-1">
                        <Tag color="primary">
                          {product.category.name || "Uncategorized"}
                        </Tag>
                      </div>
                    </div>

                    <div className="my-2">
                      <h4 className="text-muted-800 dark:text-muted-100 font-medium">
                        {product.name}
                      </h4>
                      <p className="text-muted-500 dark:text-muted-400 text-xs">
                        {product.shortDescription?.length > 100
                          ? product.shortDescription.slice(0, 100) + "..."
                          : product.shortDescription}
                      </p>
                    </div>
                    <div className="divide-muted-200 dark:divide-muted-700 flex items-center justify-between">
                      <div className="pe-4">
                        <span className="text-muted-800 dark:text-muted-100 font-bold text-md">
                          {product.price} {product.currency}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ms-2 text-muted-500 dark:text-muted-400">
                        <Tag shape="full" className="flex items-center">
                          <span>{t("Rating")}</span>
                          <Icon
                            icon="uiw:star-on"
                            className={`h-3 w-3 text-warning-500 ${
                              product.rating === 0 ? "grayscale" : ""
                            }`}
                          />
                          <span className="text-muted-400 text-xs">
                            {product.rating.toFixed(1)} ({product.reviewsCount})
                          </span>
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </Link>
                {profile && (
                  <div className="absolute top-5 right-5">
                    <IconButton
                      size={"sm"}
                      onClick={() => handleWishlistToggle(product)}
                      color={
                        wishlist.find((item) => item.id === product.id)
                          ? "danger"
                          : "muted"
                      }
                      variant={"pastel"}
                    >
                      <Icon
                        icon="mdi:heart"
                        className={`h-5 w-5 ${
                          wishlist.find((item) => item.id === product.id)
                            ? "text-danger-500"
                            : "text-muted-300"
                        }`}
                      />
                    </IconButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {filteredProducts.length > 0 &&
          filteredProducts.length < allCategoriesProducts.length && (
            <div className="my-16 flex items-center justify-center">
              <Button
                type="button"
                className="rounded-lg bg-default px-4 py-2 flex items-center gap-2"
                onClick={loadMore}
              >
                <Icon icon="ph:dots-nine-bold" className="h-4 w-4" />
                <span>{t("Load more")}</span>
              </Button>
            </div>
          )}
        {filteredProducts.length === 0 && (
          <div className="my-16 w-full text-center text-muted-500 dark:text-muted-400">
            <h2>{t("No Products Available")}</h2>
            <p>{t("Sorry, there are no products available yet.")}</p>
          </div>
        )}
      </div>

      <Faq category="ECOMMERCE" />
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const baseUrl = `${protocol}://${context.req.headers.host}`;

  try {
    const response = await $serverFetch({
      url: `${baseUrl}/api/ext/ecommerce/category`,
    });

    if (!response.data) {
      return {
        props: {
          error: "Categories not found",
        },
      };
    }

    return {
      props: {
        categories: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: `Error fetching categories: ${error.message}`,
      },
    };
  }
}

export default Shop;
