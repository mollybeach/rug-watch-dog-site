module default {
    type TokenMetrics {
        required property metadata -> str {
            default := '{}';  # Default to an empty JSON object
        }
        required property tokenAddress -> str;
        required property volumeAnomaly -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property holderConcentration -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property liquidityScore -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property priceVolatility -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property sellPressure -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property marketCapRisk -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property bundlerActivity -> bool {
            default := false;  # Default to `false`
        }
        required property accumulationRate -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property stealthAccumulation -> decimal {
            default := <decimal>0.0;  # Default value
        }
        required property suspiciousPattern -> str;  # Nullable, no default
        required property isRugPull -> bool {
            default := false;  # Default to `false`
        }
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property holders -> decimal {
            default := <decimal>0.0;  # Number of holders
        }
        required property totalSupply -> decimal {
            default := <decimal>0.0;  # Total supply
        }
        required property currentPrice -> decimal {
            default := <decimal>0.0;  # Current price
        }
        required property isHoneyPot -> bool {
            default := false;  # Honeypot indicator
        }
    };
    type TokenPrices {
        required property tokenAddress -> str;
        required property price -> decimal {
            default := <decimal>0.0;  # Default value of 0.0
        }
        required property volume24h -> decimal {
            default := <decimal>0.0;  # Default 24-hour volume to 0.0
        }
        required property marketCap -> decimal {
            default := <decimal>0.0;  # Default market capitalization to 0.0
        }
        required property liquidity -> decimal {
            default := <decimal>0.0;
        }
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    };
        type Token {
        required property address -> str {
            constraint exclusive;  # Ensure unique token addresses
        }
        required property name -> str;  # Token name
        required property symbol -> str { 
            constraint max_len_value(10);  # Limit symbol length to a reasonable max
        }
        required link metrics -> TokenMetrics {
            constraint exclusive;  # Ensure each Token has a unique TokenMetrics
        }
        required link price -> TokenPrices {
            constraint exclusive;  # Ensure each Token has a unique TokenPrices
        }
        required property createdAt -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property updatedAt -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    };
    type ReasonMessage {
        required property condition -> bool;
        required property message -> str;
    }
};