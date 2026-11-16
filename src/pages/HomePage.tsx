import { HeroSection } from "@/src/components/home/HeroSection";
import { FeaturedCollections } from "@/src/components/home/FeaturedCollections";
import { EditorialStorySection } from "@/src/components/home/EditorialStorySection";
import { BestsellingProducts } from "@/src/components/home/BestsellingProducts";
import { GalleryWallShowcase } from "@/src/components/home/GalleryWallShowcase";
import { CustomFrameCta } from "@/src/components/home/CustomFrameCta";
import { CollectorReviews } from "@/src/components/home/CollectorReviews";
import { VisualJournalGallery } from "@/src/components/home/VisualJournalGallery";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <EditorialStorySection />
      <BestsellingProducts />
      <GalleryWallShowcase />
      <CustomFrameCta />
      <CollectorReviews />
      <VisualJournalGallery />
    </>
  );
}
