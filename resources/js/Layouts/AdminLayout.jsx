import { Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FileText, 
    BarChart3, 
    Database, 
    Users, 
    ChevronDown,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [masterDataOpen, setMasterDataOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { 
            name: 'Laporan Produksi', 
            icon: FileText,
            children: [
                { name: 'Input Laporan', href: '/admin/reports/create' },
                { name: 'Riwayat Laporan', href: '/admin/reports' },
            ]
        },
        { name: 'Rekap Premium', href: '/admin/recap', icon: BarChart3 },
        { 
            name: 'Master Data', 
            icon: Database,
            children: [
                { name: 'Lines', href: '/admin/lines' },
                { name: 'Motifs', href: '/admin/motifs' },
                { name: 'Dimensions', href: '/admin/dimensions' },
                { name: 'Shifts', href: '/admin/shifts' },
            ]
        },
        { name: 'User & Role', href: '/admin/users', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                        <Link href="/" className="text-lg font-bold text-gray-900">
                            PT Surya Multi Cemerlang
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => (
                            item.children ? (
                                <div key={item.name}>
                                    <button
                                        onClick={() => item.name === 'Master Data' ? setMasterDataOpen(!masterDataOpen) : null}
                                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </div>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${item.name === 'Master Data' && masterDataOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {item.name === 'Master Data' && masterDataOpen && (
                                        <div className="mt-1 ml-8 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {item.name === 'Laporan Produksi' && (
                                        <div className="mt-1 ml-8 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-gray-200">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex items-center h-16 px-6 bg-white border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden"
                    >
                        <Menu className="w-6 h-6 text-gray-500" />
                    </button>
                    
                    <h1 className="ml-4 text-xl font-semibold text-gray-900 lg:ml-0">
                        {title}
                    </h1>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
