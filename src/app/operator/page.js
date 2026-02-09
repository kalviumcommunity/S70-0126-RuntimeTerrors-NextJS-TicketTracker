'use client';

import { useEffect, useState } from 'react';

export default function OperatorsPage() {
    const [data, setData] = useState({
        summary: {
            totalOperators: 0,
            totalRequests: 0,
            avgTime: '0 hrs',
            pendingRefunds: 0
        },
        operators: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/operators');
                if (res.ok) {
                    const jsonData = await res.json();
                    setData(jsonData);
                }
            } catch (error) {
                console.error('Failed to fetch operator data', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading analytics...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            {/* 1. Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Operators Dashboard</h1>
                <p className="text-gray-500 mt-2">Monitor refund handling performance across operators</p>
            </div>

            {/* 2. Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <MetricCard label="Total Operators" value={data.summary.totalOperators} />
                <MetricCard label="Total Refund Requests" value={data.summary.totalRequests} />
                <MetricCard label="Avg Refund Time" value={data.summary.avgTime} />
                <MetricCard label="Pending Refunds" value={data.summary.pendingRefunds} />
            </div>

            {/* 3. Operators Performance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800">Operator Performance</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operator Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Handled</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Requests</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Refund Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.operators.map((op, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{op.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{op.tickets}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${op.pending > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {op.pending}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{op.avgTime} hours</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className="bg-blue-600 h-1.5 rounded-full"
                                                    style={{ width: `${op.completionRate}%` }}
                                                ></div>
                                            </div>
                                            <span>{op.completionRate}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {data.operators.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No operator data available yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
