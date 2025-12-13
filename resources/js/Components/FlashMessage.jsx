import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (flash?.success || flash?.error || flash?.warning || flash?.info) {
            const newMessage = getMessage();
            if (newMessage) {
                setMessage(newMessage);
                setVisible(true);
                const timer = setTimeout(() => setVisible(false), 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [flash]);

    const getMessage = () => {
        if (flash?.success) return { type: 'success', text: flash.success, Icon: CheckCircle };
        if (flash?.error) return { type: 'error', text: flash.error, Icon: XCircle };
        if (flash?.warning) return { type: 'warning', text: flash.warning, Icon: AlertCircle };
        if (flash?.info) return { type: 'info', text: flash.info, Icon: Info };
        return null;
    };

    if (!visible || !message) return null;

    const { type, text, Icon } = message;

    const styles = {
        success: 'bg-green-50 text-green-800 border-green-200',
        error: 'bg-red-50 text-red-800 border-red-200',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        info: 'bg-blue-50 text-blue-800 border-blue-200',
    };

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 border rounded-lg shadow-lg ${styles[type]} min-w-[300px] max-w-md animate-slide-in`}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{text}</p>
            <button
                onClick={() => setVisible(false)}
                className="text-current hover:opacity-70 transition-opacity"
                type="button"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
