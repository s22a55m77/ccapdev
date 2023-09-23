import './restroom-form.css';


export default function RestroomForm() {
    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h2>Restroom forms</h2>
                        <div className="inputbox">
                            <ion-icon name="home-outline"></ion-icon>
                            <input type="text" id="building" placeholder=" " required />
                            <label htmlFor="building">Building</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="home-outline"></ion-icon>
                            <input type="text" id="address" placeholder=" " required />
                            <label htmlFor="address">Location</label>
                        </div>
                        <div className="smallbox">
                            <div className="input-group">
                                <ion-icon name="home-outline"></ion-icon>
                                <input type="number" id="floor" placeholder=" " required />
                                <label htmlFor="floor">Floor</label>
                            </div>

                            <div className="input-group">
                            <ion-icon name="people-outline"></ion-icon>
                            <input type="text" id="address" placeholder=" " required />
                            <label htmlFor="address">Gender</label>
                            </div>
                        </div>
                        <div className="picturebox">
                            <ion-icon name="water-outline"></ion-icon>
                            <input type="file" id="picture" required />
                            <label htmlFor="picture">Upload the Location Picture</label>
                        </div>
                        <div className="picturebox">
                            <ion-icon name="water-outline"></ion-icon>
                            <input type="file" id="picture" required />
                            <label htmlFor="picture">Upload the Restroom Picture</label>
                        </div>
                        <p>Rate it 1-5 stars!</p>
                        <div className="ratingbox">
                            <div className="rating">
                                <input type="radio" name="rate" id="rate-5" />
                                <label htmlFor="rate-5" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-4" />
                                <label htmlFor="rate-4" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-3" />
                                <label htmlFor="rate-3" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-2" />
                                <label htmlFor="rate-2" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-1" />
                                <label htmlFor="rate-1" className="fas fa-star"></label>
                            </div>
                        </div>
                        <p>Availability:</p>
                        <div className="availbox">
                            <div className="availability">
                                <input type="checkbox" name="avail" id="vending" />
                                <label htmlFor="vending">Vending Machine</label>
        
                                <input type="checkbox" name="avail" id="baghook" />
                                <label htmlFor="baghook">Bag Hook</label>
        
                                <input type="checkbox" name="avail" id="hand" />
                                <label htmlFor="hand">Hand Sanitizer</label>
                            </div>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="pencil-outline"></ion-icon>
                            <textarea id="review" placeholder=" " required></textarea>
                            <label htmlFor="review">Review</label>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
