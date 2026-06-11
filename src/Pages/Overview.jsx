import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import TrendChart from "../components/dashboard/TrendChart";
import CategoryBarChart from "../components/dashboard/CategoryBarChart";
import BudgetTracker from "../components/dashboard/BudgetTracker";
import "./Overview.css";

const trendData = [
  { month: 'Jan', spend: 9200, budget: 12000 },
  { month: 'Feb', spend: 11400, budget: 12000 },
  { month: 'Mar', spend: 10800, budget: 12000 },
  { month: 'Apr', spend: 13100, budget: 12000 },
  { month: 'May', spend: 13250, budget: 12000 },
  { month: 'Jun', spend: 14320, budget: 12000 },
];

const categoryData = [
  { name: 'Food', amount: 4850, fill: '#a855f7' },
  { name: 'Utilities', amount: 3800, fill: '#6366f1' },
  { name: 'Shopping', amount: 2100, fill: '#ec4899' },
];

const budgetData = [
  { category: 'Food', spent: 4850, limit: 6000 },
  { category: 'Utilities', spent: 3800, limit: 3500 },
  { category: 'Shopping', spent: 2100, limit: 3000 },
];

export default function Overview() {
    const { logout } = useContext(AuthContext);

    return (
        <div className="overview-page-container">
            {/* Background glowing blobs */}
            <div className="overview-bg-blob overview-blob-1"></div>
            <div className="overview-bg-blob overview-blob-2"></div>

            <div className="overview-content-wrapper">
                
                {/* Header Card */}
                <header className="overview-card overview-header">
                    <div className="brand-section">
                        <div className="brand-logo-container">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <span className="brand-logo-text">ExpenseFlow</span>
                    </div>

                    <div className="user-badge">
                        <div className="user-welcome">
                            June 2026
                            <strong>Financial Overview</strong>
                        </div>
                        <button onClick={logout} className="logout-btn">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                {/* FULL WIDTH TREND CHART */}
                <TrendChart data={trendData} />

                {/* TWO COLUMN LAYOUT FOR SMALLER CHARTS */}
                <div className="dashboard-grid">
                    <CategoryBarChart data={categoryData} />
                    <BudgetTracker data={budgetData} />
                </div>

            </div>
        </div>
    );
}