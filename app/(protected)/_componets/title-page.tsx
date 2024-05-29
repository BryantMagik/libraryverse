interface Titleprops {
    title: String
    subtitle: String
}

export const TitlePage: React.FC<Titleprops> = ({ title, subtitle }) => {
    return (
        <>
            <div>
                <div className="space-y-1">
                    <h2
                        className="text-2xl leading-9 font-semibold text-custom-gray border-almond-300 border-b-4
                    dark:text-emerald-600 dark:border-emerald-400"
                    >
                        {title}
                    </h2>
                    <p className="text-sm text-muted-foreground dark:text-white">
                        {subtitle}
                    </p>
                </div>
            </div>
        </>
    )
}