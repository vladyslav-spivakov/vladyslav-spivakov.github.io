type ServiceFactory<T> = (container: Container) => T

export class Container {
  private readonly factories = new Map<string, ServiceFactory<unknown>>()
  private readonly instances = new Map<string, unknown>()

  register<T>(token: string, factory: ServiceFactory<T>): void {
    this.factories.set(token, factory)
  }

  resolve<T>(token: string): T {
    if (this.instances.has(token)) {
      return this.instances.get(token) as T
    }

    const factory = this.factories.get(token)
    if (!factory) {
      throw new Error(`Service not registered: ${token}`)
    }

    const instance = factory(this)
    this.instances.set(token, instance)
    return instance as T
  }
}
