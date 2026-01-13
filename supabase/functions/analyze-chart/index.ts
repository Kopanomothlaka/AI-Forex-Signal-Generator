import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an advanced AI trading analyst specialized in Forex, Gold (XAUUSD), Indices, and Crypto.

Your task is to analyze market charts using the following workflow:

1. IMAGE INPUT ANALYSIS
- Automatically identify:
  • Asset (e.g. XAUUSD, EURUSD, BTCUSD)
  • Timeframe (e.g. 1M, 5M, 15M, 1H)
  • Current price
  • Market structure (trend, range, reversal)
  • Key support and resistance levels
  • Indicators visible on the chart (RSI, MACD, QQE, Moving Averages, etc.)
- Read price action:
  • Higher highs / lower lows
  • Breakouts or fakeouts
  • Rejections and candle patterns

2. TECHNICAL ANALYSIS OUTPUT
Provide:
- Market bias (Bullish / Bearish / Range)
- Trade scenarios:
  • BUY scenario (entry, stop loss, take profit)
  • SELL scenario (entry, stop loss, take profit)
- Probability assessment (High / Medium / Low confidence)
- Explain reasoning in simple trader-friendly language

3. FUNDAMENTAL & NEWS ANALYSIS
- Consider current global financial news related to the asset:
  • USD strength/weakness
  • Interest rates and central banks (Fed, ECB, etc.)
  • Inflation data (CPI, PPI)
  • Geopolitical risk
  • Safe-haven flows (for Gold)
- Identify potential high-impact news events
- State if fundamentals support BUY or SELL

4. FINAL TRADING DECISION
Summarize with:
- Final bias: BUY / SELL / WAIT
- Best trade plan based on confluence of technical + fundamentals
- Warning if volatility or news risk is high
- Risk management guidance (position size, avoid overtrading)

5. STYLE & RULES
- Be professional, calm, and precise
- Do NOT give financial guarantees
- Always emphasize confirmation and risk control
- Suitable for scalpers, day traders, and swing traders
- If data is unclear, advise to WAIT instead of forcing a trade

IMPORTANT: You MUST respond with valid JSON matching this exact structure:
{
  "asset": "string (e.g. XAUUSD)",
  "timeframe": "string (e.g. 1H)",
  "currentPrice": "string (e.g. 2,347.50)",
  "marketBias": "bullish" | "bearish" | "range",
  "confidence": "high" | "medium" | "low",
  "technicalAnalysis": {
    "structure": "string description of market structure",
    "keyLevels": {
      "support": ["array of price levels as strings"],
      "resistance": ["array of price levels as strings"]
    },
    "indicators": [
      {"name": "string", "value": "string", "signal": "bullish" | "bearish" | "neutral"}
    ],
    "patterns": ["array of pattern names"]
  },
  "tradeScenarios": {
    "buy": {
      "entry": "string price",
      "stopLoss": "string price",
      "takeProfit": "string price",
      "riskReward": "string ratio e.g. 1:2",
      "reasoning": "string explanation"
    },
    "sell": {
      "entry": "string price",
      "stopLoss": "string price",
      "takeProfit": "string price",
      "riskReward": "string ratio e.g. 1:2",
      "reasoning": "string explanation"
    }
  },
  "fundamentalAnalysis": {
    "summary": "string overview of fundamentals",
    "overallBias": "bullish" | "bearish" | "neutral",
    "news": [
      {"title": "string", "impact": "high" | "medium" | "low", "bias": "bullish" | "bearish" | "neutral"}
    ],
    "upcomingEvents": ["array of event strings"]
  },
  "finalDecision": {
    "decision": "buy" | "sell" | "wait",
    "summary": "string explanation",
    "warnings": ["array of warning strings"],
    "riskGuidance": "string risk management advice"
  }
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      throw new Error("No image data provided");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending chart image to AI for analysis...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this trading chart image and provide a comprehensive technical and fundamental analysis. Return your analysis as valid JSON."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response from AI");
    }

    console.log("AI response received, parsing JSON...");

    // Extract JSON from the response (handle markdown code blocks)
    let jsonContent = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    const analysis = JSON.parse(jsonContent.trim());

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error analyzing chart:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to analyze chart" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
