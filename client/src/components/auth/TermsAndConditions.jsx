const TermsAndConditions = ({ onClose }) => {
    return (
        <div className="flex flex-col items-center relative m-8 rounded-xl shadow-xl ring-1 ring-slate-300">
            <button className="absolute top-3 right-3 ring-2 ring-slate-400 rounded-full h-6 w-6 pb-1" onClick={() => onClose(prev => !prev)}>x</button>
            <h1 className="text-2xl m-4 tracing-wider mx-auto text-center font-bolder">

                Terms and Conditions
            </h1>
            <p className=" m-8">

                By using this website, you agree to comply with and be bound by the following terms and conditions. All content, including text, images, and media, is for informational purposes only and may not be reproduced or distributed without permission. We reserve the right to modify or update these terms at any time without prior notice.

                Your use of this site is at your own risk. We do not guarantee the accuracy, completeness, or reliability of any information provided. Any reliance you place on such material is strictly at your own discretion, and we are not liable for any losses or damages arising from its use.

                This website may contain links to third-party sites. We are not responsible for the content, privacy policies, or practices of any external websites. Your interactions with these third-party sites are solely between you and the respective provider, and we encourage you to review their terms before engaging.

                By continuing to use this website, you acknowledge and accept these terms. If you do not agree with any part of these conditions, please discontinue use immediately. For any questions or concerns, feel free to contact us.
            </p>
        </div>
    )
}

export default TermsAndConditions
