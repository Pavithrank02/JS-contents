class SearchView {
_parentEl = document.querySelector('.search');

getQuery() {
    //console.log(this._parentEl, 'r');
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
}

_clearInput() {
     this._parentEl.querySelector('.search__field').value = '';
    
}

addHandlerSearch(handler) {
    //console.log(this._parentEl);
    this._parentEl.addEventListener('submit', function(e) {
        //console.log('e', e);
        e.preventDefault();
        handler();
    })
    //console.log(handler);
}

}
export default new SearchView();