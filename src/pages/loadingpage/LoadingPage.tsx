export default function LoadingPage() {
    // Design
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="h-fit text-center">
                <img
                    alt="Loading..."
                    src="/loading.gif"
                    className="inline-block w-64 h-64"
                />
            </div>
        </div>
    );
}