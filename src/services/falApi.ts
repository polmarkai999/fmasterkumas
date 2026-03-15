import { fal } from "./falClient";
import { FRONT_VIEW_PROMPT, BACK_VIEW_PROMPT, CLOSEUP_VIEW_PROMPT, LOCATION_VIEW_PROMPT, OUTDOOR_BACKGROUND_PROMPT } from "./prompt";

export type AIModelId = "fal-ai/fashn/tryon/v1.5" | "fal-ai/idm-vton" | "fal-ai/nano-banana-pro/edit";
export type ViewMode = "front" | "back" | "closeup" | "location" | "location-closeup";

export interface GenerationParams {
  modelId: AIModelId;
  garmentImageUrl: string;
  modelImageUrl: string;
  seed?: number;
  quality?: "performance" | "balanced" | "quality";
  numSamples?: number;
  viewMode?: ViewMode;
  locationImageUrl?: string;
}

const getPromptForView = (viewMode: ViewMode): string => {
  switch (viewMode) {
    case "back":
      return BACK_VIEW_PROMPT;
    case "closeup":
      return CLOSEUP_VIEW_PROMPT;
    case "location":
      return LOCATION_VIEW_PROMPT;
    case "location-closeup":
      return OUTDOOR_BACKGROUND_PROMPT;
    case "front":
    default:
      return FRONT_VIEW_PROMPT;
  }
};

const getDescriptionForView = (viewMode: ViewMode): string => {
  switch (viewMode) {
    case "back":
      return "The gown design, silhouette, lace embroidery, corset structure, and satin overskirt must remain identical to the reference dress. Elegant professional bridal couture transfer onto model — STRICT BACK VIEW. Model facing away from camera. Centered symmetrical back composition. Show back of dress, corset back, train. Face must NOT be visible.";
    case "closeup":
      return "The gown design, silhouette, lace embroidery, corset structure, and satin overskirt must remain identical to the reference dress. Elegant professional bridal couture transfer — EXTREME CLOSE-UP DETAIL. Macro photography of dress fabric, lace patterns, beadwork, embroidery. Tight crop on bodice/torso. 50mm macro lens style.";
    case "location":
      return "The gown design, silhouette, lace embroidery, corset structure, and satin overskirt must remain identical to the reference dress. Elegant professional bridal couture transfer onto model — ON-LOCATION SHOOT. Place the dressed model naturally into the venue/location environment. Match lighting, perspective, and atmosphere of the location.";
    case "location-closeup":
      return "The gown design, silhouette, lace embroidery, corset structure, and satin overskirt must remain identical to the reference dress. Create an outdoor luxury fashion photography background for waist-up bridal portrait. No people. Historic European castle with botanical garden. Cinematic depth of field.";
    case "front":
    default:
      return "The gown design, silhouette, lace embroidery, corset structure, and satin overskirt must remain identical to the reference dress. Elegant professional bridal couture transfer onto model";
  }
};

export const generateBridalImage = async (params: GenerationParams, onUpdate?: (update: any) => void) => {
  const { modelId, garmentImageUrl, modelImageUrl, seed, quality = "balanced", numSamples = 1, viewMode = "front", locationImageUrl } = params;

  if (modelId === "fal-ai/fashn/tryon/v1.5") {
    return await fal.subscribe("fal-ai/fashn/tryon/v1.5", {
      input: {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
        category: "one-pieces",
        mode: quality,
        garment_photo_type: "model",
        num_samples: numSamples,
        seed: seed,
        output_format: "png"
      },
      logs: true,
      onQueueUpdate: onUpdate
    });
  }

  if (modelId === "fal-ai/idm-vton") {
    return await fal.subscribe("fal-ai/idm-vton", {
      input: {
        human_image_url: modelImageUrl,
        garment_image_url: garmentImageUrl,
        description: getDescriptionForView(viewMode),
        num_inference_steps: 50,
        seed: seed
      },
      logs: true,
      onQueueUpdate: onUpdate
    });
  }

  // Nano Banana Pro Edit — use view-specific prompt with input images
  const imageUrls = [garmentImageUrl, modelImageUrl];
  if ((viewMode === "location" || viewMode === "location-closeup") && locationImageUrl) {
    imageUrls.push(locationImageUrl);
  }

  return await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: {
      prompt: getPromptForView(viewMode),
      image_urls: imageUrls,
      num_images: numSamples,
      resolution: "2K",
      aspect_ratio: "auto",
      output_format: "png",
    } as any,
    logs: true,
    onQueueUpdate: onUpdate
  });
};

export const uploadFile = async (file: File) => {
  return await fal.storage.upload(file);
};
