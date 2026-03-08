import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text, Img } from '@react-email/components';
import React from 'react';

interface ReportEmailProps {
    fullName: string;
    estimatedValue: string;
    neighborhood: string;
    district: string;
    city: string;
    aiComment: string;
}

export default function ReportEmail({
    fullName,
    estimatedValue,
    neighborhood,
    district,
    city,
    aiComment
}: ReportEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Evin Değeri - Gayrimenkul Değerleme Raporunuz Hazır!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Evin Değeri</Heading>
                    <Text style={text}>Merhaba {fullName},</Text>
                    <Text style={text}>
                        Talep etmiş olduğunuz <b>{neighborhood}, {district}, {city}</b> konumundaki gayrimenkulünüz için
                        yapay zeka destekli piyasa değerleme analizimiz tamamlanmıştır.
                    </Text>

                    <Section style={valueSection}>
                        <Text style={valueTitle}>Tahmini Piyasa Değeriniz</Text>
                        <Text style={valueAmount}>{estimatedValue}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        <Heading style={h2}>Uzman / AI Analizi</Heading>
                        <Text style={aiText}>{aiComment}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Bu rapor bilgilendirme amaçlı otomatik olarak hazırlanmıştır ve kesin bir yatırım tavsiyesi,
                        resmi ekspertiz raporu veya hukuki bir dayanak teşkil etmez.
                    </Text>
                    <Text style={footer}>
                        © 2026 Evin Değeri. Tüm hakları saklıdır.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    maxWidth: '580px',
};

const h1 = {
    color: '#1d1d1f',
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center' as const,
    padding: '30px 20px',
    margin: '0',
};

const h2 = {
    color: '#1d1d1f',
    fontSize: '18px',
    fontWeight: '600',
    padding: '0 40px',
    marginTop: '24px',
};

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '0 40px',
};

const valueSection = {
    backgroundColor: '#0071E3',
    padding: '24px 40px',
    margin: '24px 0',
};

const valueTitle = {
    color: '#e6f2ff',
    fontSize: '14px',
    marginBottom: '8px',
    opacity: 0.9,
};

const valueAmount = {
    color: '#ffffff',
    fontSize: '36px',
    fontWeight: '700',
    margin: '0',
};

const aiText = {
    color: '#525f7f',
    fontSize: '14px',
    lineHeight: '24px',
    padding: '0 40px',
    fontStyle: 'italic',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 40px',
    textAlign: 'center' as const,
};
