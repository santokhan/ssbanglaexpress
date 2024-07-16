const BannerBottom = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='bg-gray-50 items-center justify-between gap-8 flex-wrap rounded-lg p-4 lg:p-8 text-gray-800 flex'>
        <div className=''>
          <h3 className='mb-1 max-w-xl text-3xl font-bold leading-tight'>Need help? Talk to our expert.</h3>
          <p>Talk to our experts or Browse through more properties.</p>
        </div>
        <div className='flex gap-4'>
          {/* <AnchorOutline href='/contact-us'>Contact Us</AnchorOutline> */}
          {/* <AnchorSolid href='tel:+97142287788'>+97142287788</AnchorSolid> */}
        </div>
      </div>
    </div>
  )
}

export default BannerBottom