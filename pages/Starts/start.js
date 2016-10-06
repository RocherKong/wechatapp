var Agent = require( '../../utils/Agent.js' )

Page( {
    data: {
        // text:"这是一个页面"
        loading: true,
        hasMore: false,
        scrollTop: 100,
        index: 0,
        items: [],
        tempsearchKey: '',
        searchKey: '',
        currentIndex: 1,
        searchState: 0,
        maxIndex: 1,
        hisSearch: 'histroySearch',
        historySearchList: [],
        brands: [],
        product: Object,
        brandId: ''
    },
    onLoad: function( options ) {

    },
    onReady: function() {

        this.LoadMore();
    },
    onShow: function() {
        // 页面显示

    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    upper: function( e ) {
        console.log( e )
        if( this.data.currentIndex > 1 ) {
            this.setData( {
                currentIndex: this.data.currentIndex - 1,
                hasMore: true,
                 scrollTop: this.data.scrollTop + 10 
            });
            this.LoadMore();
        } else {
            this.setData( {
                // currentIndex: this.data.currentIndex - 1,
                hasMore: false
            });
        }
    },
    lower: function( e ) {
        if( this.data.currentIndex < this.data.maxIndex ) {
            this.setData( {
                currentIndex: this.data.currentIndex + 1,
                hasMore: true, 
                scrollTop: this.data.scrollTop + 30 
            });
            this.LoadMore();
        } else {
            this.setData( {
                // currentIndex: this.data.currentIndex + 1,
                hasMore: false
            });
        }
    },
    scroll: function( e ) {
        //console.log(e);
    },
    LoadMore() {
        //this.setData({loading:true});

        Agent( 'P.Product.Search',
            {
                SearchKey: this.data.searchKey,
                PageIndex: this.data.currentIndex,
                PageSize: 10,
                Highlight: false
            },
            ( resp ) => {
                if( resp.Body.Products.length == 0 ) {
                    // 状态码判断搜索结果
                    this.searchState = 0;
                    this.setData( { loading: false });
                } else {
                    this.searchState = 1;
                    //this.loading.dismiss();
                    this.setData( { loading: false });
                }

                //maxIndex 
                if( resp.Body.TotalRecord % 10 == 0 ) {
                    this.setData( {
                        maxIndex: Math.floor( resp.Body.TotalRecord / 10 )
                    });

                } else {
                    this.setData( {
                        maxIndex: Math.floor( resp.Body.TotalRecord / 10 ) + 1
                    });

                }
                var items = [];
                for( var product of resp.Body.Products ) {
                    items.push( product );
                };
                this.setData( { items: items});
            },
            ( resp ) => {
                console.log( resp )
            })
    },
    bindButtonSearch: function( e ) {
        this.setData( {
            currentIndex: 1,
            searchKey: this.data.tempsearchKey,
            tempsearchKey: ''
        });
        this.LoadMore();
        this.setData({
            scrollTop: 0
        });

    },
    bindKeyInput: function( e ) {
        this.setData( {
            tempsearchKey: e.detail.value
        })
    },
})