import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const CurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');

    const handleConvert = async () => {
        const response = await fetch('/api/convert-currency', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fromCurrency, toCurrency, amount }),
        });
        const data = await response.json();
        setResult(data.result);
    };

    return (

        <>
            <Helmet>
                <title>Free Currency Converter - From Currency Converter with one Click</title>
                <meta name="description" content="Convert between different currencies using real-time exchange rates with one click." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Currency Converter</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convert between different currencies using real-time exchange rates.
                        </p>

                        <div className="flex flex-col space-y-4">
                            {result && <p className="mt-4 text-center text-2xl font-bold text-green-800"> {amount} {fromCurrency} = {result} {toCurrency}</p>}


                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full p-2 border rounded-md"
                            />
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="" disabled>Select From Currency</option>
                                <option value="USD">USD (United States Dollar)</option>
                                <option value="AED">AED (United Arab Emirates Dirham)</option>
                                <option value="AFN">AFN (Afghan Afghani)</option>
                                <option value="ALL">ALL (Albanian Lek)</option>
                                <option value="AMD">AMD (Armenian Dram)</option>
                                <option value="ANG">ANG (Netherlands Antillean Guilder)</option>
                                <option value="AOA">AOA (Angolan Kwanza)</option>
                                <option value="ARS">ARS (Argentine Peso)</option>
                                <option value="AUD">AUD (Australian Dollar)</option>
                                <option value="AWG">AWG (Aruban Florin)</option>
                                <option value="AZN">AZN (Azerbaijani Manat)</option>
                                <option value="BAM">BAM (Bosnia-Herzegovina Convertible Mark)</option>
                                <option value="BBD">BBD (Barbadian Dollar)</option>
                                <option value="BDT">BDT (Bangladeshi Taka)</option>
                                <option value="BGN">BGN (Bulgarian Lev)</option>
                                <option value="BHD">BHD (Bahraini Dinar)</option>
                                <option value="BIF">BIF (Burundian Franc)</option>
                                <option value="BMD">BMD (Bermudian Dollar)</option>
                                <option value="BND">BND (Brunei Dollar)</option>
                                <option value="BOB">BOB (Bolivian Boliviano)</option>
                                <option value="BRL">BRL (Brazilian Real)</option>
                                <option value="BSD">BSD (Bahamian Dollar)</option>
                                <option value="BTN">BTN (Bhutanese Ngultrum)</option>
                                <option value="BWP">BWP (Botswana Pula)</option>
                                <option value="BYN">BYN (Belarusian Ruble)</option>
                                <option value="BZD">BZD (Belize Dollar)</option>
                                <option value="CAD">CAD (Canadian Dollar)</option>
                                <option value="CDF">CDF (Congolese Franc)</option>
                                <option value="CHF">CHF (Swiss Franc)</option>
                                <option value="CLP">CLP (Chilean Peso)</option>
                                <option value="CNY">CNY (Chinese Yuan)</option>
                                <option value="COP">COP (Colombian Peso)</option>
                                <option value="CRC">CRC (Costa Rican Colón)</option>
                                <option value="CUP">CUP (Cuban Peso)</option>
                                <option value="CVE">CVE (Cape Verdean Escudo)</option>
                                <option value="CZK">CZK (Czech Koruna)</option>
                                <option value="DJF">DJF (Djiboutian Franc)</option>
                                <option value="DKK">DKK (Danish Krone)</option>
                                <option value="DOP">DOP (Dominican Peso)</option>
                                <option value="DZD">DZD (Algerian Dinar)</option>
                                <option value="EGP">EGP (Egyptian Pound)</option>
                                <option value="ERN">ERN (Eritrean Nakfa)</option>
                                <option value="ETB">ETB (Ethiopian Birr)</option>
                                <option value="EUR">EUR (Euro)</option>
                                <option value="FJD">FJD (Fijian Dollar)</option>
                                <option value="FKP">FKP (Falkland Islands Pound)</option>
                                <option value="FOK">FOK (Faroese Króna)</option>
                                <option value="GBP">GBP (British Pound Sterling)</option>
                                <option value="GEL">GEL (Georgian Lari)</option>
                                <option value="GGP">GGP (Guernsey Pound)</option>
                                <option value="GHS">GHS (Ghanaian Cedi)</option>
                                <option value="GIP">GIP (Gibraltar Pound)</option>
                                <option value="GMD">GMD (Gambian Dalasi)</option>
                                <option value="GNF">GNF (Guinean Franc)</option>
                                <option value="GTQ">GTQ (Guatemalan Quetzal)</option>
                                <option value="GYD">GYD (Guyanese Dollar)</option>
                                <option value="HKD">HKD (Hong Kong Dollar)</option>
                                <option value="HNL">HNL (Honduran Lempira)</option>
                                <option value="HRK">HRK (Croatian Kuna)</option>
                                <option value="HTG">HTG (Haitian Gourde)</option>
                                <option value="HUF">HUF (Hungarian Forint)</option>
                                <option value="IDR">IDR (Indonesian Rupiah)</option>
                                <option value="ILS">ILS (Israeli Shekel)</option>
                                <option value="INR">INR (Indian Rupee)</option>
                                <option value="IQD">IQD (Iraqi Dinar)</option>
                                <option value="IRR">IRR (Iranian Rial)</option>
                                <option value="ISK">ISK (Icelandic Króna)</option>
                                <option value="JMD">JMD (Jamaican Dollar)</option>
                                <option value="JOD">JOD (Jordanian Dinar)</option>
                                <option value="JPY">JPY (Japanese Yen)</option>
                                <option value="KES">KES (Kenyan Shilling)</option>
                                <option value="KGS">KGS (Kyrgyzstani Som)</option>
                                <option value="KHR">KHR (Cambodian Riel)</option>
                                <option value="KID">KID (Kiribati Dollar)</option>
                                <option value="KMF">KMF (Comorian Franc)</option>
                                <option value="KRW">KRW (South Korean Won)</option>
                                <option value="KWD">KWD (Kuwaiti Dinar)</option>
                                <option value="KYD">KYD (Cayman Islands Dollar)</option>
                                <option value="KZT">KZT (Kazakhstani Tenge)</option>
                                <option value="LAK">LAK (Lao Kip)</option>
                                <option value="LBP">LBP (Lebanese Pound)</option>
                                <option value="LKR">LKR (Sri Lankan Rupee)</option>
                                <option value="LRD">LRD (Liberian Dollar)</option>
                                <option value="LSL">LSL (Lesotho Loti)</option>
                                <option value="LYD">LYD (Libyan Dinar)</option>
                                <option value="MAD">MAD (Moroccan Dirham)</option>
                                <option value="MDL">MDL (Moldovan Leu)</option>
                                <option value="MGA">MGA (Malagasy Ariary)</option>
                                <option value="MKD">MKD (Macedonian Denar)</option>
                                <option value="MMK">MMK (Myanmar Kyat)</option>
                                <option value="MNT">MNT (Mongolian Tögrög)</option>
                                <option value="MOP">MOP (Macanese Pataca)</option>
                                <option value="MRU">MRU (Mauritanian Ouguiya)</option>
                                <option value="MUR">MUR (Mauritian Rupee)</option>
                                <option value="MVR">MVR (Maldivian Rufiyaa)</option>
                                <option value="MWK">MWK (Malawian Kwacha)</option>
                                <option value="MXN">MXN (Mexican Peso)</option>
                                <option value="MYR">MYR (Malaysian Ringgit)</option>
                                <option value="MZN">MZN (Mozambican Metical)</option>
                                <option value="NAD">NAD (Namibian Dollar)</option>
                                <option value="NGN">NGN (Nigerian Naira)</option>
                                <option value="NIO">NIO (Nicaraguan Córdoba)</option>
                                <option value="NOK">NOK (Norwegian Krone)</option>
                                <option value="NPR">NPR (Nepalese Rupee)</option>
                                <option value="NZD">NZD (New Zealand Dollar)</option>
                                <option value="OMR">OMR (Omani Rial)</option>
                                <option value="PAB">PAB (Panamanian Balboa)</option>
                                <option value="PEN">PEN (Peruvian Sol)</option>
                                <option value="PGK">PGK (Papua New Guinean Kina)</option>
                                <option value="PHP">PHP (Philippine Peso)</option>
                                <option value="PKR">PKR (Pakistani Rupee)</option>
                                <option value="PLN">PLN (Polish Złoty)</option>
                                <option value="PYG">PYG (Paraguayan Guaraní)</option>
                                <option value="QAR">QAR (Qatari Riyal)</option>
                                <option value="RON">RON (Romanian Leu)</option>
                                <option value="RSD">RSD (Serbian Dinar)</option>
                                <option value="RUB">RUB (Russian Ruble)</option>
                                <option value="RWF">RWF (Rwandan Franc)</option>
                                <option value="SAR">SAR (Saudi Riyal)</option>
                                <option value="SBD">SBD (Solomon Islands Dollar)</option>
                                <option value="SCR">SCR (Seychellois Rupee)</option>
                                <option value="SDG">SDG (Sudanese Pound)</option>
                                <option value="SEK">SEK (Swedish Krona)</option>
                                <option value="SGD">SGD (Singapore Dollar)</option>
                                <option value="SHP">SHP (Saint Helena Pound)</option>
                                <option value="SLE">SLE (Sierra Leonean Leone)</option>
                                <option value="SLL">SLL (Sierra Leonean Leone)</option>
                                <option value="SOS">SOS (Somali Shilling)</option>
                                <option value="SRD">SRD (Surinamese Dollar)</option>
                                <option value="SSP">SSP (South Sudanese Pound)</option>
                                <option value="STN">STN (São Tomé and Príncipe Dobra)</option>
                                <option value="SYP">SYP (Syrian Pound)</option>
                                <option value="SZL">SZL (Eswatini Lilangeni)</option>
                                <option value="THB">THB (Thai Baht)</option>
                                <option value="TJS">TJS (Tajikistani Somoni)</option>
                                <option value="TMT">TMT (Turkmenistani Manat)</option>
                                <option value="TND">TND (Tunisian Dinar)</option>
                                <option value="TOP">TOP (Tongan Paʻanga)</option>
                                <option value="TRY">TRY (Turkish Lira)</option>
                                <option value="TTD">TTD (Trinidad and Tobago Dollar)</option>
                                <option value="TVD">TVD (Tuvaluan Dollar)</option>
                                <option value="TWD">TWD (New Taiwan Dollar)</option>
                                <option value="TZS">TZS (Tanzanian Shilling)</option>
                                <option value="UAH">UAH (Ukrainian Hryvnia)</option>
                                <option value="UGX">UGX (Ugandan Shilling)</option>
                                <option value="UYU">UYU (Uruguayan Peso)</option>
                                <option value="UZS">UZS (Uzbekistani Soʻm)</option>
                                <option value="VES">VES (Venezuelan Bolívar)</option>
                                <option value="VND">VND (Vietnamese đồng)</option>
                                <option value="VUV">VUV (Vanuatu Vatu)</option>
                                <option value="WST">WST (Samoan Tala)</option>
                                <option value="XAF">XAF (Central African CFA Franc)</option>
                                <option value="XCD">XCD (East Caribbean Dollar)</option>
                                <option value="XDR">XDR (Special Drawing Rights)</option>
                                <option value="XOF">XOF (West African CFA Franc)</option>
                                <option value="XPF">XPF (CFP Franc)</option>
                                <option value="YER">YER (Yemeni Rial)</option>
                                <option value="ZAR">ZAR (South African Rand)</option>
                                <option value="ZMW">ZMW (Zambian Kwacha)</option>
                                <option value="ZWL">ZWL (Zimbabwean Dollar)</option>
                            </select>

                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="" disabled>Select From Currency</option>
                                <option value="USD">USD (United States Dollar)</option>
                                <option value="AED">AED (United Arab Emirates Dirham)</option>
                                <option value="AFN">AFN (Afghan Afghani)</option>
                                <option value="ALL">ALL (Albanian Lek)</option>
                                <option value="AMD">AMD (Armenian Dram)</option>
                                <option value="ANG">ANG (Netherlands Antillean Guilder)</option>
                                <option value="AOA">AOA (Angolan Kwanza)</option>
                                <option value="ARS">ARS (Argentine Peso)</option>
                                <option value="AUD">AUD (Australian Dollar)</option>
                                <option value="AWG">AWG (Aruban Florin)</option>
                                <option value="AZN">AZN (Azerbaijani Manat)</option>
                                <option value="BAM">BAM (Bosnia-Herzegovina Convertible Mark)</option>
                                <option value="BBD">BBD (Barbadian Dollar)</option>
                                <option value="BDT">BDT (Bangladeshi Taka)</option>
                                <option value="BGN">BGN (Bulgarian Lev)</option>
                                <option value="BHD">BHD (Bahraini Dinar)</option>
                                <option value="BIF">BIF (Burundian Franc)</option>
                                <option value="BMD">BMD (Bermudian Dollar)</option>
                                <option value="BND">BND (Brunei Dollar)</option>
                                <option value="BOB">BOB (Bolivian Boliviano)</option>
                                <option value="BRL">BRL (Brazilian Real)</option>
                                <option value="BSD">BSD (Bahamian Dollar)</option>
                                <option value="BTN">BTN (Bhutanese Ngultrum)</option>
                                <option value="BWP">BWP (Botswana Pula)</option>
                                <option value="BYN">BYN (Belarusian Ruble)</option>
                                <option value="BZD">BZD (Belize Dollar)</option>
                                <option value="CAD">CAD (Canadian Dollar)</option>
                                <option value="CDF">CDF (Congolese Franc)</option>
                                <option value="CHF">CHF (Swiss Franc)</option>
                                <option value="CLP">CLP (Chilean Peso)</option>
                                <option value="CNY">CNY (Chinese Yuan)</option>
                                <option value="COP">COP (Colombian Peso)</option>
                                <option value="CRC">CRC (Costa Rican Colón)</option>
                                <option value="CUP">CUP (Cuban Peso)</option>
                                <option value="CVE">CVE (Cape Verdean Escudo)</option>
                                <option value="CZK">CZK (Czech Koruna)</option>
                                <option value="DJF">DJF (Djiboutian Franc)</option>
                                <option value="DKK">DKK (Danish Krone)</option>
                                <option value="DOP">DOP (Dominican Peso)</option>
                                <option value="DZD">DZD (Algerian Dinar)</option>
                                <option value="EGP">EGP (Egyptian Pound)</option>
                                <option value="ERN">ERN (Eritrean Nakfa)</option>
                                <option value="ETB">ETB (Ethiopian Birr)</option>
                                <option value="EUR">EUR (Euro)</option>
                                <option value="FJD">FJD (Fijian Dollar)</option>
                                <option value="FKP">FKP (Falkland Islands Pound)</option>
                                <option value="FOK">FOK (Faroese Króna)</option>
                                <option value="GBP">GBP (British Pound Sterling)</option>
                                <option value="GEL">GEL (Georgian Lari)</option>
                                <option value="GGP">GGP (Guernsey Pound)</option>
                                <option value="GHS">GHS (Ghanaian Cedi)</option>
                                <option value="GIP">GIP (Gibraltar Pound)</option>
                                <option value="GMD">GMD (Gambian Dalasi)</option>
                                <option value="GNF">GNF (Guinean Franc)</option>
                                <option value="GTQ">GTQ (Guatemalan Quetzal)</option>
                                <option value="GYD">GYD (Guyanese Dollar)</option>
                                <option value="HKD">HKD (Hong Kong Dollar)</option>
                                <option value="HNL">HNL (Honduran Lempira)</option>
                                <option value="HRK">HRK (Croatian Kuna)</option>
                                <option value="HTG">HTG (Haitian Gourde)</option>
                                <option value="HUF">HUF (Hungarian Forint)</option>
                                <option value="IDR">IDR (Indonesian Rupiah)</option>
                                <option value="ILS">ILS (Israeli Shekel)</option>
                                <option value="INR">INR (Indian Rupee)</option>
                                <option value="IQD">IQD (Iraqi Dinar)</option>
                                <option value="IRR">IRR (Iranian Rial)</option>
                                <option value="ISK">ISK (Icelandic Króna)</option>
                                <option value="JMD">JMD (Jamaican Dollar)</option>
                                <option value="JOD">JOD (Jordanian Dinar)</option>
                                <option value="JPY">JPY (Japanese Yen)</option>
                                <option value="KES">KES (Kenyan Shilling)</option>
                                <option value="KGS">KGS (Kyrgyzstani Som)</option>
                                <option value="KHR">KHR (Cambodian Riel)</option>
                                <option value="KID">KID (Kiribati Dollar)</option>
                                <option value="KMF">KMF (Comorian Franc)</option>
                                <option value="KRW">KRW (South Korean Won)</option>
                                <option value="KWD">KWD (Kuwaiti Dinar)</option>
                                <option value="KYD">KYD (Cayman Islands Dollar)</option>
                                <option value="KZT">KZT (Kazakhstani Tenge)</option>
                                <option value="LAK">LAK (Lao Kip)</option>
                                <option value="LBP">LBP (Lebanese Pound)</option>
                                <option value="LKR">LKR (Sri Lankan Rupee)</option>
                                <option value="LRD">LRD (Liberian Dollar)</option>
                                <option value="LSL">LSL (Lesotho Loti)</option>
                                <option value="LYD">LYD (Libyan Dinar)</option>
                                <option value="MAD">MAD (Moroccan Dirham)</option>
                                <option value="MDL">MDL (Moldovan Leu)</option>
                                <option value="MGA">MGA (Malagasy Ariary)</option>
                                <option value="MKD">MKD (Macedonian Denar)</option>
                                <option value="MMK">MMK (Myanmar Kyat)</option>
                                <option value="MNT">MNT (Mongolian Tögrög)</option>
                                <option value="MOP">MOP (Macanese Pataca)</option>
                                <option value="MRU">MRU (Mauritanian Ouguiya)</option>
                                <option value="MUR">MUR (Mauritian Rupee)</option>
                                <option value="MVR">MVR (Maldivian Rufiyaa)</option>
                                <option value="MWK">MWK (Malawian Kwacha)</option>
                                <option value="MXN">MXN (Mexican Peso)</option>
                                <option value="MYR">MYR (Malaysian Ringgit)</option>
                                <option value="MZN">MZN (Mozambican Metical)</option>
                                <option value="NAD">NAD (Namibian Dollar)</option>
                                <option value="NGN">NGN (Nigerian Naira)</option>
                                <option value="NIO">NIO (Nicaraguan Córdoba)</option>
                                <option value="NOK">NOK (Norwegian Krone)</option>
                                <option value="NPR">NPR (Nepalese Rupee)</option>
                                <option value="NZD">NZD (New Zealand Dollar)</option>
                                <option value="OMR">OMR (Omani Rial)</option>
                                <option value="PAB">PAB (Panamanian Balboa)</option>
                                <option value="PEN">PEN (Peruvian Sol)</option>
                                <option value="PGK">PGK (Papua New Guinean Kina)</option>
                                <option value="PHP">PHP (Philippine Peso)</option>
                                <option value="PKR">PKR (Pakistani Rupee)</option>
                                <option value="PLN">PLN (Polish Złoty)</option>
                                <option value="PYG">PYG (Paraguayan Guaraní)</option>
                                <option value="QAR">QAR (Qatari Riyal)</option>
                                <option value="RON">RON (Romanian Leu)</option>
                                <option value="RSD">RSD (Serbian Dinar)</option>
                                <option value="RUB">RUB (Russian Ruble)</option>
                                <option value="RWF">RWF (Rwandan Franc)</option>
                                <option value="SAR">SAR (Saudi Riyal)</option>
                                <option value="SBD">SBD (Solomon Islands Dollar)</option>
                                <option value="SCR">SCR (Seychellois Rupee)</option>
                                <option value="SDG">SDG (Sudanese Pound)</option>
                                <option value="SEK">SEK (Swedish Krona)</option>
                                <option value="SGD">SGD (Singapore Dollar)</option>
                                <option value="SHP">SHP (Saint Helena Pound)</option>
                                <option value="SLE">SLE (Sierra Leonean Leone)</option>
                                <option value="SLL">SLL (Sierra Leonean Leone)</option>
                                <option value="SOS">SOS (Somali Shilling)</option>
                                <option value="SRD">SRD (Surinamese Dollar)</option>
                                <option value="SSP">SSP (South Sudanese Pound)</option>
                                <option value="STN">STN (São Tomé and Príncipe Dobra)</option>
                                <option value="SYP">SYP (Syrian Pound)</option>
                                <option value="SZL">SZL (Eswatini Lilangeni)</option>
                                <option value="THB">THB (Thai Baht)</option>
                                <option value="TJS">TJS (Tajikistani Somoni)</option>
                                <option value="TMT">TMT (Turkmenistani Manat)</option>
                                <option value="TND">TND (Tunisian Dinar)</option>
                                <option value="TOP">TOP (Tongan Paʻanga)</option>
                                <option value="TRY">TRY (Turkish Lira)</option>
                                <option value="TTD">TTD (Trinidad and Tobago Dollar)</option>
                                <option value="TVD">TVD (Tuvaluan Dollar)</option>
                                <option value="TWD">TWD (New Taiwan Dollar)</option>
                                <option value="TZS">TZS (Tanzanian Shilling)</option>
                                <option value="UAH">UAH (Ukrainian Hryvnia)</option>
                                <option value="UGX">UGX (Ugandan Shilling)</option>
                                <option value="UYU">UYU (Uruguayan Peso)</option>
                                <option value="UZS">UZS (Uzbekistani Soʻm)</option>
                                <option value="VES">VES (Venezuelan Bolívar)</option>
                                <option value="VND">VND (Vietnamese đồng)</option>
                                <option value="VUV">VUV (Vanuatu Vatu)</option>
                                <option value="WST">WST (Samoan Tala)</option>
                                <option value="XAF">XAF (Central African CFA Franc)</option>
                                <option value="XCD">XCD (East Caribbean Dollar)</option>
                                <option value="XDR">XDR (Special Drawing Rights)</option>
                                <option value="XOF">XOF (West African CFA Franc)</option>
                                <option value="XPF">XPF (CFP Franc)</option>
                                <option value="YER">YER (Yemeni Rial)</option>
                                <option value="ZAR">ZAR (South African Rand)</option>
                                <option value="ZMW">ZMW (Zambian Kwacha)</option>
                                <option value="ZWL">ZWL (Zimbabwean Dollar)</option>
                            </select>


                            <button
                                onClick={handleConvert}
                                className="w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Convert
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Instant Currency Conversion!</h3>
                        <p className="text-gray-600 mb-4">
                            Our free currency converter allows you to quickly convert between different currencies using the latest exchange rates. Enter the amount, select your currencies, and get the conversion result instantly.
                        </p>
                        <p className="text-gray-600">
                            If you need any assistance or have questions, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're always here to help!
                        </p>
                    </div>
                </div>
            </main>

        </>
    );
};

export default CurrencyConverter;