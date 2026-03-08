import crypto from 'crypto';

interface ParamPosConfig {
    clientCode: string;
    clientUsername: string;
    clientPassword: string;
    guid: string;
    apiUrl: string;
}

const config: ParamPosConfig = {
    clientCode: process.env.PARAMPOS_CLIENT_CODE || "",
    clientUsername: process.env.PARAMPOS_CLIENT_USERNAME || "",
    clientPassword: process.env.PARAMPOS_CLIENT_PASSWORD || "",
    guid: process.env.PARAMPOS_GUID || "",
    apiUrl: process.env.PARAMPOS_API_URL || "https://test-api.param.com.tr",
};

/**
 * Hash generator for ParamPos transaction security.
 * ParamPos uses SHA256 hashed signature: Base64(SHA256(CLIENT_CODE + GUID + Taksit + IslemTutar + ToplamTutar + SiparisId + HataURL + BasariliURL))
 */
export function generateParamPosHash(orderId: string, amount: number, successUrl: string, errorUrl: string): string {
    const amountStr = amount.toFixed(2).replace('.', ','); // format as 100,00

    // As per typical ParamPos spec (may slightly vary based on 3D Secure / Non-3D Secure)
    // Format: CLIENT_CODE + GUID + Taksit + IslemTutar + ToplamTutar + SiparisId + HataUrl + BasariliUrl
    const securityString = `${config.clientCode}${config.guid}1${amountStr}${amountStr}${orderId}${errorUrl}${successUrl}`;

    const hash = crypto.createHash('sha256').update(securityString).digest('base64');
    return hash;
}

/**
 * Creates the checkout form parameters required to post to ParamPos 3D Secure Gateway.
 */
export function createPaymentFormArgs(params: {
    orderId: string;
    amount: number;
    successUrl: string;
    errorUrl: string;
    customerEmail?: string;
    customerPhone?: string;
    customerName?: string;
}) {
    const amountStr = params.amount.toFixed(2).replace('.', ',');
    const hash = generateParamPosHash(params.orderId, params.amount, params.successUrl, params.errorUrl);

    return {
        client_code: config.clientCode,
        client_username: config.clientUsername,
        client_password: config.clientPassword,
        guid: config.guid,
        islem_Guvenlik_Tip: "3D",
        Siparis_ID: params.orderId,
        Siparis_Aciklama: "evindegeri.com B2B Abonelik",
        Islem_Tutar: amountStr,
        Toplam_Tutar: amountStr,
        Taksit: "1",
        Basarili_URL: params.successUrl,
        Hata_URL: params.errorUrl,
        Data1: params.customerEmail || "",
        Data2: params.customerPhone || "",
        Data3: params.customerName || "",
        Hash: hash,
        apiUrl: `${config.apiUrl}/pay?` // Hypothetical endpoint; to be verified on actual JS integration
    };
}
