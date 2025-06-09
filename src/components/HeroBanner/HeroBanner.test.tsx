import { render as customRender } from "@/common/tests/test-utils";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeroBanner } from "./HeroBanner";

// Mock de los hooks
vi.mock("@/common/hooks/useMoviesQuery", () => ({
  useMoviesQuery: vi.fn(),
}));

// Mock de los iconos
vi.mock("@/common/assets/icons/arrowLeft.png", () => ({
  default: "/test-arrow-left.png",
}));

vi.mock("@/common/assets/icons/user.png", () => ({
  default: "/test-user.png",
}));

// Importar el mock después de declararlo
const { useMoviesQuery } = await import("@/common/hooks/useMoviesQuery");
const mockUseMoviesQuery = vi.mocked(useMoviesQuery);

describe("HeroBanner", () => {
  beforeEach(() => {
    // Reset mock
    mockUseMoviesQuery.mockReturnValue({
      data: [
        {
          id: 1,
          title: "Test Hero Movie",
          overview: "Test overview",
          poster_path: "/test-poster.jpg",
          backdrop_path: "/test-backdrop.jpg",
          release_date: "2023-01-01",
          vote_average: 8.5,
          vote_count: 1000,
          genre_ids: [1, 2],
          adult: false,
          original_language: "en",
          original_title: "Test Hero Movie",
          popularity: 100,
          video: false,
        },
      ],
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: true,
      isRefetching: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: Date.now(),
      failureCount: 0,
      failureReason: null,
      fetchStatus: "idle",
      isFetched: true,
      isFetchedAfterMount: true,
      isInitialLoading: false,
      isPlaceholderData: false,
      isPreviousData: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn(),
      status: "success",
    } as any);
  });

  it("renders hero movie information", () => {
    customRender(<HeroBanner />);

    expect(screen.getByText("TEST HERO MOVIE")).toBeInTheDocument();
    expect(screen.getByText("Watch Now")).toBeInTheDocument();
    expect(screen.getByText("+2 friends are watching")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockUseMoviesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      isError: false,
      error: null,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: false,
      isRefetching: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: Date.now(),
      failureCount: 0,
      failureReason: null,
      fetchStatus: "fetching",
      isFetched: false,
      isFetchedAfterMount: false,
      isInitialLoading: true,
      isPlaceholderData: false,
      isPreviousData: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn(),
      status: "pending",
    } as any);

    customRender(<HeroBanner />);

    // Verificar que se muestra el loader
    const skeletonElements = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("shows error state when no movies", () => {
    mockUseMoviesQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: true,
      isRefetching: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: Date.now(),
      failureCount: 0,
      failureReason: null,
      fetchStatus: "idle",
      isFetched: true,
      isFetchedAfterMount: true,
      isInitialLoading: false,
      isPlaceholderData: false,
      isPreviousData: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn(),
      status: "success",
    } as any);

    customRender(<HeroBanner />);

    expect(screen.getByText("No se encontró la película")).toBeInTheDocument();
  });

  it("renders user avatars", () => {
    customRender(<HeroBanner />);

    const userIcons = screen.getAllByAltText("user icon");
    expect(userIcons).toHaveLength(3);
  });

  it("renders play button with correct styling", () => {
    customRender(<HeroBanner />);

    const watchButton = screen.getByText("Watch Now");
    expect(watchButton).toHaveClass("bg-accent-secondary");
    expect(watchButton).toHaveClass("text-white");
  });

  it("renders movie title in uppercase", () => {
    customRender(<HeroBanner />);

    const title = screen.getByText("TEST HERO MOVIE");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-2xl", "lg:text-4xl", "font-black");
  });

  it("has correct container styling", () => {
    const { container } = customRender(<HeroBanner />);

    const heroSection = container.querySelector("section");
    expect(heroSection).toHaveClass(
      "relative",
      "h-[260px]",
      "lg:h-[134px]",
      "rounded-3xl",
      "overflow-hidden"
    );
  });

  it("renders background image when poster path exists", () => {
    customRender(<HeroBanner />);

    const backgroundImage = screen.getByAltText("Test Hero Movie");
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveClass(
      "w-full",
      "h-full",
      "object-cover",
      "brightness-50"
    );
  });
});
