using extension edgeql_http;

module default {
    type Token {
        required property address -> str {
            constraint exclusive;
            constraint max_len_value(42);
        }
        required property name -> str {
            constraint max_len_value(255);
        }
        required property symbol -> str {
            constraint max_len_value(10);
        }
        required property metrics -> str;
        required property created_at -> datetime {
            default := datetime_current();
        }
        required property updated_at -> datetime {
            default := datetime_current();
        }
    }

    type TokenMetrics {
        required property tokenAddress -> str;
        required property holders -> int16 {
            default := 0;
        }
        required property total_supply -> decimal {
            default := 0;
        }
        required property volumeAnomaly -> decimal {
            default := 0;
        }
        required property holderConcentration -> decimal {
            default := 0;
        }
        required property liquidityScore -> decimal {
            default := 0;
        }
        required property priceVolatility -> decimal {
            default := 0;
        }
        required property sellPressure -> decimal {
            default := 0;
        }
        required property marketCapRisk -> decimal {
            default := 0;
        }
        required property is_honeypot -> bool {
            default := false;
        }
        required property isRugPull -> bool {
            default := false;
        }
        required property risk_score -> decimal {
            default := 0;
        }
        required property timestamp -> datetime {
            default := datetime_current();
        }
    }

    type TokenPrices {
        required property tokenAddress -> str;
        required property price -> decimal {
            default := 0;
        }
        required property volume_24h -> decimal {
            default := 0;
        }
        required property marketCap -> decimal {
            default := 0;
        }
        required property liquidity -> decimal {
            default := 0;
        }
        required property timestamp -> datetime {
            default := datetime_current();
        }
    }
}
