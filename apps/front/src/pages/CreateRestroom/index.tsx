import './index.css';

export default function Index() {
  return (
    <section className="restroom-form-section">
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2 className="restroom-form-h2">Restroom forms</h2>
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
            <p className={'restroom-form-p'}>Availability:</p>
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
          </form>
        </div>
        <div className="second-column">
          <div className="picturebox">
            <ion-icon name="water-outline"></ion-icon>
            <input type="file" id="picture" required multiple />
            <label htmlFor="picture">Upload the Location Picture</label>
          </div>
          <div className="picturebox">
            <ion-icon name="water-outline"></ion-icon>
            <input type="file" id="picture" required multiple />
            <label htmlFor="picture">Upload the Restroom Picture</label>
          </div>
          <button className={'restroom-form-button'}>Submit</button>
        </div>
      </div>
    </section>
  );
}
