
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        nav: {
          'to ': { width: '100%' },
          'from': { width: '0' },
        }
      }
      ,

      animation: {
        wiggle: 'nav 0.2s ease-in-out',
      },
      screens: {
        'xlg': { 'raw': '(min-width: 1280px)' },
        'mobileland': {'raw': 'all and (max-device-width: 960px) and (orientation:landscape)'},
        'tabletland':{'raw': '(min-width:992px)'} ,
        'lg': {'raw': '(min-width: 1200px)'},
      }
      ,
      backgroundImage: {
        'board-header': "url('./assets/background_illustration/mobile/background-header.png')",
        'board-header-tb': "url('./assets/background_illustration/tablet/background-header.png')",
        'board-header-dk': "url('./assets/background_illustration/desktop/background-header.png')",
      },
      gridTemplateColumns: {
        'two': '255px auto'
      } ,

      boxShadow: {
        dropdown:'0px 10px 40px -7px rgba(55, 63, 104, 0.350492)'
      },

      gridTemplateRows: {
        'two': '56px  auto'
      } ,

      colors: {
        appBg:'#F7F8FD',
        link:'#4661E6',
        linkbg:'#F2F4FF',
        roadmap:'#3A4374',
        status:'#647196',
        dropContain: '#373F68',
        btnColor:'#F2F4FE',
        error:'#D73737',
       },

      fontFamily:{
        jost:['Jost', 'serif']
      },
      
      fontSize: {
        h1:['24px',{letterSpacing:'-0.33', lineHeight:'35px'}],
        h2:['20px',{letterSpacing:'-0.25', lineHeight:'29px'}],
        h3:['18px', {letterSpacing:'-0.25', lineHeight:'26px'}],
        h4:['14px',{letterSpacing:'-0.2', lineHeight:'20px'}],
        h1:['24px',{letterSpacing:'-0.33', lineHeight:'35px'}],
        body1:['16px','23px'],
        body2:['15px','22px'],
        body3:['13px','19px'],
      },

      height:{
        boardHeight:'72px',
        h137:'137px',
        h178:'178px',
        linkheight:'30px',
        h166:'166px',
        dropContain:'56px',
      },

      borderRadius: {
        link:'10px'
      },

      width:{
        w255:'255px',
        w223:'223px'
      }
    },
  },
  plugins: [],
}
