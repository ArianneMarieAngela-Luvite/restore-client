import { CheckIcon } from "@radix-ui/react-icons"

const tiers = [
    {
        name: 'Pay-Per-Use',
        id: 'pay-per-use',
        to: '/billing-information',
        // price: '--',
        description:"Ideal for businesses that need flexibility and control over their usage.",
        features: ['No Subscription Required', 'On-Demand Forecasting', 'Exportable Data', 'Easy-to-Use Interface', 'Scalable'],
        featured: true

    },
    {
        name: 'Partnership',
        id: 'partnership',
        to: '',
        // price: '--',
        description:"Designed for companies looking to integrate ReStore into their existing platforms or services. ",
        features: ['Customizable Solutions', 'Flexible Pricing', 'Co-Marketing Opportunities'],
        featured: false

    }
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }
const AltPricing = () => {
  return (
  <div id="pricing"   className="h-100vh w-full  "> 
    <div className="container  mx-auto px-10 xs:px-5 py-10">
      {/* <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#caddcb] to-[#14b94b] opacity-30"
        />
      </div> */}
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Choose what's best for you
        </p>
      </div>
      <p className="mx-auto text-center mt-6 max-w-2xl text-lg leading-8 mb-5 sm:mt-0 text-gray-600 ">
        Your trusted partner for freelancers, startups, micro, small, and medium enterprises all over the world

      </p>
      <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-emerald-950 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                  : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? 'text-primary' : 'text-primary',
                'text-base font-semibold leading-7',
              )}
            >
              {tier.name}
            </h3>
            {/* <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-bold tracking-tight',
                )}
              >
                {tier.price}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-transparent', 'text-base')}>/per use</span>
            </p> */}
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm leading-6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-primary' : 'text-primary', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.to}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90 focus-visible:outline-primary'
                  : 'text-primary ring-1 ring-inset ring-green-500 hover:primary/80 hover:text-primary/80 focus-visible:outline-primary',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
              )}
            >
              Connect with Us For Pricing
            </a>
          </div>
        ))}
      </div>
    </div>

</div>

  )
}

export default AltPricing
