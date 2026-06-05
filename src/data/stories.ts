export type Story = {
  id: string;
  category: string;
  categoryStyle: "primary" | "critical" | "tertiary";
  image: string;
  headline: string;
  summary: string;
  source: string;
};

export const stories: Story[] = [
  {
    id: "1",
    category: "TECHNOLOGY",
    categoryStyle: "primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJHe8hDD6cAK9y25mgfyICSGHxQCp46e75dwz9yiLVGrQeARbq4qzrlu3NLc4QTrJKQqcXB3ehSm7X9uoFGvnWWVrIt3X_Vbv1tvu9u6N3VZ3qk2Nxu6bwcfuN_AGBZh5Y3A2IQjVXBWXgNk6NurZ9zPQQ8X9jUQlPvJZSqQxhEIEr3ONCYDtooiR4OMLRfiwrGuR85ASNL-IgdJ-seiFA6wUKKOHL8TQaWDQx2XK1ENPNkrrkqVIh_FUOem3dkI0MsAwc-6oXJAA",
    headline:
      "Next-Generation Silicon: The Breakthrough Shaping Quantum Computing's Future",
    summary:
      "Researchers have unveiled a revolutionary silicon-based architecture that allows quantum bits to maintain coherence for significantly longer periods. This breakthrough addresses one of the primary hurdles in scalable quantum hardware, promising a new era of ultra-fast computation. Tech giants are already racing to integrate these developments into their upcoming infrastructure roadmaps.",
    source: "TECHWIRE",
  },
  {
    id: "2",
    category: "BREAKING",
    categoryStyle: "critical",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD86fe-xmw4e4_0dryvRYkQKLvJsBh4naxK3eva7S9uXUB1uAywhiGLbaZGmThoVhHwZ_ik7ecKFiINh1CL3wbHdVZOqunPMnRqdvl1opBRThymMNra1mnYvsvV8aT0DECC3NMggb_3eaQNNy21iUp3tvQlavrichckLb1OXr9gqgWi79TreEgpWzoB4m5m3CkqxW3KhwlnW5kW-jWX1qarwcju8RO-pPMazgYoPi_BAPBgZG53NKabzg5sYFN6BJSFvZxVmTyKTXQ",
    headline:
      "Vertical Forests: Why Modern Skyscrapers Are Turning Green to Save Energy",
    summary:
      "New urban planning mandates in major metropolises are requiring skyscrapers to incorporate vertical greenery. These \"living walls\" act as natural insulation, reducing building cooling costs by up to 30%. Beyond efficiency, the movement aims to restore urban biodiversity and improve air quality in densely populated regions, marking a radical shift in 21st-century architectural philosophy.",
    source: "ECOPLANET",
  },
  {
    id: "3",
    category: "ECONOMY",
    categoryStyle: "tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOosqfo6LiWAl87EROiXfO3RKAAM_cvzIhjlmIumkUkRz_GcULMhL5UEVM8CYmCd4opTuBMr0FIfCnXPzAN93va1hq5eKEl-cfl8aAp0kGTyUKM3rzdiyb82kDa9CoUVhZeyDGqgSX9TGJrLa1ZaGsvneDWFfy4nL8KIu46I6MzbA7DIGo1Hx0ARvqUlawRnE5nV8xcvGEKCgsXni_Z0mJiau9rYU4QJXfTGoJ4kBNtOTc3QZecLKS8MVg8sPyRF1kBXhPn9l_tE4",
    headline:
      "Market Shock: Central Banks Hint at Unprecedented Interest Rate Adjustments",
    summary:
      "Global markets reacted sharply today as central banks signaled a more aggressive stance on inflation control. The proposed interest rate adjustments are the most significant in over a decade, aiming to stabilize the currency while cooling an overheating labor market. Economists warned that the move could trigger short-term volatility but remains essential for long-term fiscal health.",
    source: "BLOOMPRESS",
  },
];
