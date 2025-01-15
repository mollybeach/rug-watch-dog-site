module default {
    type Token {
        required property address -> str {
            constraint exclusive;  # Ensure unique token addresses
        }
        required property name -> str;  # Token name
        required property symbol -> str { 
            constraint max_len_value(10);  # Limit symbol length to a reasonable max
        }
        required property createdAt -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property updatedAt -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    };
    type TokenMetrics {
        required property metadata -> str {
            default := '{}';  # Default to an empty JSON object
        }
        required property tokenAddress -> str;  # No default because it's unique for each token
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
        optional property stealthAccumulation -> decimal {
            default := <decimal>0.0;  # Default value
        }
        optional property suspiciousPattern -> str;  # Nullable, no default
        required property isRugPull -> bool {
            default := false;  # Default to `false`
        }
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    };

    type TokenPrices {
        required property tokenAddress -> str {
            constraint exclusive;  # Ensure uniqueness for token addresses if needed
        }
        required property price -> decimal {
            default := <decimal>0.0;  # Default value of 0.0
        }
        required property volume_24h -> decimal {
            default := <decimal>0.0;  # Default 24-hour volume to 0.0
        }
        required property marketCap -> decimal {
            default := <decimal>0.0;  # Default market capitalization to 0.0
        }
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    };
};
