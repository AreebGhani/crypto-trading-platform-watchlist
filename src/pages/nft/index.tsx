import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "@/layouts/Nav";
import { useNftStore } from "@/stores/nft";
import { $serverFetch } from "@/utils/api";
import styles from "./index.module.css";

const TrendingCollectionsSlider = dynamic(
  () => import("@/components/pages/nft/home/Trending")
);
const TopCollections = dynamic(
  () => import("@/components/pages/nft/home/Collections")
);
const FeaturedNftAssets = dynamic(
  () => import("@/components/pages/nft/home/FeaturedAssets")
);
const CreatorBanner = dynamic(
  () => import("@/components/pages/nft/home/CreatorBanner")
);
const Stats = dynamic(() => import("@/components/pages/nft/home/Features"));

interface Props {
  initialTrendingCollections: Array<any>;
  initialTopCollections: Array<any>;
  initialFeaturedAssets: Array<any>;
}

const NFTHomePage: React.FC<Props> = ({
  initialTrendingCollections,
  initialTopCollections,
  initialFeaturedAssets,
}) => {
  const { setTrendingCollections, setTopCollections, setFeaturedAssets } =
    useNftStore();

  useEffect(() => {
    setTrendingCollections(initialTrendingCollections);
    setTopCollections(initialTopCollections);
    setFeaturedAssets(initialFeaturedAssets);
  }, [
    initialTrendingCollections,
    initialTopCollections,
    initialFeaturedAssets,
  ]);

  return (
    <Layout horizontal>
      <div className={styles.page}>
        {" "}
        {/* Apply the custom font class */}
        <TrendingCollectionsSlider />
        <TopCollections />
        <FeaturedNftAssets />
        <Stats />
        <CreatorBanner />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const baseUrl = `${protocol}://${context.req.headers.host}`;

  try {
    const [trendingResponse, topCollectionsResponse, featuredAssetsResponse] =
      await Promise.all([
        $serverFetch({ url: `${baseUrl}/api/ext/nft/collection/trending` }),
        $serverFetch({ url: `${baseUrl}/api/ext/nft/collection/top` }),
        $serverFetch({ url: `${baseUrl}/api/ext/nft/asset/featured` }),
      ]);

    return {
      props: {
        initialTrendingCollections: trendingResponse.data || [],
        initialTopCollections: topCollectionsResponse.data || [],
        initialFeaturedAssets: featuredAssetsResponse.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialTrendingCollections: [],
        initialTopCollections: [],
        initialFeaturedAssets: [],
      },
    };
  }
}

export default NFTHomePage;
