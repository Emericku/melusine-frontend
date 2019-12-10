export interface Fetcher<MODEL, ACTION> {
    started(): ACTION;
    done(content: MODEL): ACTION;
    failed(error: string): ACTION;
}
