"use client";

import Link from 'next/link';

export default function SideBar() {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link href="/visualizations/risk-metrics" className="hover:text-gray-300">
                            Risk Metrics
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/visualizations/market-risk-radar" className="hover:text-gray-300">
                            Market Risk Radar
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/visualizations/network-analysis" className="hover:text-gray-300">
                            Network Analysis
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/visualizations/nft-analytics" className="hover:text-gray-300">
                            NFT Analytics
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}