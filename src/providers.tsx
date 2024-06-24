import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import APIProvider from '@Hooks/useAPI/useAPI.tsx';
import AuthProvider from '@Hooks/useAuth/useAuth.tsx';
import CDNProvider from '@Hooks/useCDN/useCDN.tsx';
import PaymentProvider from '@Hooks/usePayment/usePayment.tsx';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import ToastProvider from '@Hooks/useToast/useToast.tsx';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PrimeReactProvider>
                <ToastProvider>
                    <AuthProvider>
                        <APIProvider>
                            <CDNProvider>
                                <PaymentProvider>
                                    {children}
                                </PaymentProvider>
                            </CDNProvider>
                        </APIProvider>
                    </AuthProvider>
                </ToastProvider>
            </PrimeReactProvider>
        </Provider>
    )
}

export default Providers;