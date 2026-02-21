export interface Factory<TFactoryHandler> {
    register(name: string, factory: TFactoryHandler): Factory<TFactoryHandler>;
    get(name: string): TFactoryHandler;
    has(name: string): boolean;
}
