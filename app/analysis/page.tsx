import { Shield, AlertTriangle, CheckCircle, Activity, Lock, TrendingUp, Users, FileWarning } from "lucide-react";
import { Card } from "@/components/ui/card";

const securityStats = [
  {
    name: "Risk Score",
    value: "76/100",
    change: "-12.3%",
    icon: AlertTriangle,
    color: "text-yellow-500"
  },
  {
    name: "Secure Contracts",
    value: "1,492",
    change: "+23.1%",
    icon: Lock,
    color: "text-green-500"
  },
  {
    name: "Active Monitoring",
    value: "48,921",
    change: "+15.4%",
    icon: Activity,
    color: "text-blue-500"
  },
  {
    name: "Threats Detected",
    value: "26",
    change: "-8.2%",
    icon: FileWarning,
    color: "text-red-500"
  }
];

const securityAnalysis = {
  "Smart Contract Risks": {
    status: "Medium Risk",
    issues: 12,
    severity: "Medium",
    recommendations: 8
  },
  "Liquidity Analysis": {
    status: "High Risk",
    issues: 3,
    severity: "Critical",
    recommendations: 5
  },
  "Ownership Pattern": {
    status: "Low Risk",
    issues: 1,
    severity: "Low",
    recommendations: 2
  }
};

export default function AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
              Security Analysis
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Real-time analysis of{" "}
              <span className="font-medium text-purple-600 dark:text-purple-400">security risks</span>
              {" "}and{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">threat detection</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <Card className="p-6 border-t-4 border-t-purple-500 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityStats.map((stat) => (
            <div key={stat.name} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Analysis Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          Detailed Security Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(securityAnalysis).map(([category, data]) => (
            <Card key={category} className="p-6 hover:shadow-xl transition-shadow border-t-4 border-t-purple-500">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                {category}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.status === 'High Risk' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                    data.status === 'Medium Risk' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                  }`}>
                    {data.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Issues Found</span>
                  <span className="font-medium text-red-500">{data.issues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Severity</span>
                  <span className={`font-medium ${
                    data.severity === 'Critical' ? 'text-red-500' :
                    data.severity === 'Medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {data.severity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Recommendations</span>
                  <span className="font-medium text-blue-500">{data.recommendations}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Security Recommendations */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800/50 dark:to-purple-900/10">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold">Security Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                Immediate Actions
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Review contract permissions</li>
                <li>Monitor liquidity pools</li>
                <li>Audit token distribution</li>
                <li>Check wallet interactions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                Preventive Measures
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Enable multi-sig requirements</li>
                <li>Implement time-locks</li>
                <li>Set up automated alerts</li>
                <li>Regular security audits</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}