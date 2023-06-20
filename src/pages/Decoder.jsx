import { useEffect, useState } from 'react';
import '../styles/Decoder.scss';

import { TagCloud } from 'react-tagcloud'
import { useLocation } from 'react-router-dom';
import Menu from '../components/Menu';

function Decoder() {
  const [jsonValues, setJsonValues] = useState([])

  const [titles, setTitles] = useState()
  const [duplicateURLs, setDuplicateURLs] = useState({})
  const [tagCloudHTML, setTagCloudHTML] = useState(<p className='tag-cloud'>Analysing data...</p>)
  const [topURLs, setTopURLs] = useState(<p>Analysing data...</p>)
  const [profileData, setProfileData] = useState(<p>Analysing data...</p>)

  const location = useLocation()
  let browserHistoryJson
  let autofillJson

  // Check if an object is empty
  function isEmptyObject(obj) {
      if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
          return true
      } else {
          return false
      }
  }

  function daysSince(timestamp) {
    let currentTime = Math.floor(Date.now() / 1000)
    let elapsed = currentTime - timestamp
    
    let sPerMinute = 60;
    let sPerHour = sPerMinute * 60;
    let sPerDay = sPerHour * 24;
    let sPerMonth = sPerDay * 30;
    let sPerYear = sPerDay * 365;

    if (elapsed < sPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';   
    } else if (elapsed < sPerHour) {
          return Math.round(elapsed/sPerMinute) + ' minutes ago';   
    } else if (elapsed < sPerDay ) {
          return Math.round(elapsed/sPerHour ) + ' hours ago';   
    } else if (elapsed < sPerMonth) {
        return 'Approximately ' + Math.round(elapsed/sPerDay) + ' days ago';   
    } else if (elapsed < sPerYear) {
        return 'Approximately ' + Math.round(elapsed/sPerMonth) + ' months ago';   
    } else {
        return 'Approximately ' + Math.round(elapsed/sPerYear ) + ' years ago';   
    }
  }

  // Return the analysis (word/letter frequency) of the given text 
  function analyseSiteTitles(json) {
    let array = []

    for (let i = 0; i < json['Browser History'].length; i++) {
      array.push(json['Browser History'][i].title)
    }

    const counts = {}

    for (const num of array) {
      // Check if the num is a duplicate
      counts[num] = counts[num] ? counts[num] + 1 : 1
    }

    return counts
  }

  // Sets DuplicateStrings state to an object with the duplicated strings with a frequency count
  function findDuplicateURLs(array) {
    const counts = {}

    for (const num of array) {
      // If the value is a string and a URL
      if (typeof num === 'string' && num.startsWith('http')) {
        
        // Get the host out of the URL
        let host = num.split( '/' )[2]

        // Check if the host is a duplicate
        counts[host] = counts[host] ? counts[host] + 1 : 1
      }
    }

    setDuplicateURLs(counts)
  }
  
  // Put the top titles in the TagCloud
  function createTagCloud(textData) {
    let titles = []

    // Put the titles in an array so they can be sorted
    Object.entries(textData).forEach(word => {
      titles.push([word[0], word[1]])
    });

    // Sort titles on frequency
    titles = titles.sort((a,b) => b[1]-a[1])
    
    // Get the top 25 used titles
    titles = titles.slice(0, 25)

    let tags = []
    titles.forEach(title => {
      tags.push({value: title[0], count: title[1]})
    })

    setTagCloudHTML(<TagCloud 
      key={0} 
      minSize={15} 
      maxSize={50} 
      colorOptions={{
        luminosity: 'dark',
        hue: '#609ae0'
      }}
      tags={tags}
      onClick={tag => alert(`'${tag.value}' was seen ${tag.count} times!`)} />)
  }

  // Extract all the Json values and put an array of them in the JsonValues state
  function extractJsonValues(json, values = [], i = 0) {
    // Get the next values to loop through
    let newValues = Object.values(json)

    let finalLoop = true

    newValues.forEach(datapoint => {                        // For each datapoint in the array... 
      if (typeof datapoint === 'object'){                   // ...check if it is an object.
        finalLoop = false
        return extractJsonValues(datapoint, values, i++)    // Loop through the next object
      } else {                                              // If it isn't an object
        values.push(datapoint)                              // Save the value in the values array
      }
    })

    if (finalLoop) {
      setJsonValues(values)
    }
  }

  useEffect(() => {
    if (location.state) {
      browserHistoryJson = location.state['Browser History']
      autofillJson = location.state['Autofill']
    }
  }, [])

  // Set the Json values when the file updates
  useEffect(() => {
    if (!isEmptyObject(browserHistoryJson)) {
      extractJsonValues(browserHistoryJson)

      setTitles(analyseSiteTitles(browserHistoryJson))
    } else {
      console.log('No BrowserHistory.json found');
      setTagCloudHTML(<p>BrowserHistory.json not uploaded</p>)
      setTopURLs(<p>BrowserHistory.json not uploaded</p>)
    }
  }, [browserHistoryJson])

  // Puts Autofill data into a object in the profileData state 
  function analyseAutofill() {
    let profiles = autofillJson['Autofill Profile']
    
    let useCount = []
    for (let i = 0; i < profiles.length; i++) {
      useCount.push(profiles[i].use_count)
    }
    let profile = profiles[useCount.indexOf(Math.max(...useCount))]

    setProfileData(
      <div className='profile'>
        <p className="name">{profile.name_full[0] ? profile.name_full[0] : 'No name found'}</p>
        <p className="address"><b>Address:</b> <br /> 
        {profile.address_home_line1 ? profile.address_home_line1 : 'No street found'}, {profile.address_home_city ? profile.address_home_city : 'No city found'} <br /> 
        {profile.address_home_zip ? profile.address_home_zip : 'No ZIP code found'}</p>
        <p className="contact"><b>Contact:</b> <br /> 
          {profile.phone_home_whole_number[0] ? profile.phone_home_whole_number[0] : 'No phonenumber found'} | {profile.email_address[0] ? profile.email_address[0] : 'No email address found'}</p>
        <p className="lastUsed">Last used: {daysSince(profile.use_date)}</p>
      </div>
    )
  }

  useEffect(() => {
    if (!isEmptyObject(autofillJson)) {
      analyseAutofill()
    } else {
      setProfileData(<p>Autofill.json not uploaded</p>)
      console.log('No Autofill.json found');
    }
  }, [autofillJson])

  // // Analyse the values when they update
  useEffect(() => {
    if (jsonValues) {
      findDuplicateURLs(jsonValues)
    }
  }, [jsonValues])

  // Fill topURLs when the duplicateStrings is updated 
  useEffect(() => {
    // Check if duplicateStrings is filled 
    if (!isEmptyObject(duplicateURLs)) {
      // Sort all the URLs based on their value (how many times they where opened)
      let sortedList = Object.entries(duplicateURLs).sort((a,b) => b[1]-a[1])

      let newTopURLs = []
      // Put the top 20 most visited URLs in newTopURLs
      for (let i = 0; i < 20; i++) {
        // console.log(sortedList[i]);
        if (sortedList[i]) {
          let newItem = <p className='topURL' key={i}><b>{sortedList[i][0]}</b> <br /> visited <i>{sortedList[i][1]}</i> times</p>
          newTopURLs.push(newItem)
        }
      }

      setTopURLs(newTopURLs)
    }
  }, [duplicateURLs])

  // Create a new Tag Cloud if the Text Analysis updates
  useEffect(() => {
    if (titles && !isEmptyObject(titles)) {
      createTagCloud(titles)
    }
  }, [titles])

  // Match .tagCloudSection and .topURLsSection heights
  useEffect(() => {
    let tagEl = document.querySelector('.tagCloudSection')
    let urlEl = document.querySelector('.topURLsSection')

    urlEl.style.height = tagEl.clientHeight + 'px'
  })

  return (
    <div className="Decoder">
      <p className="backgroundText">{jsonValues.join(' ')}</p>
      
      <Menu settings={[
        { 'target': 'browser-history', 'title' : 'Browser History' },
        { 'target': 'autofill', 'title' : 'Autofill' }
      ]} />

      <header className='header'>
        <div className="header__img">
          <img src="/assets/img/banner.png" />
        </div>
        <div className='header__txt'>
          <h1 className='title'>DecodeMe</h1>
          <h2 className='subtitle'>From transparancy to insight</h2>
        </div>
      </header>

      <main>
        <div className="browserHistory" id='browser-history'>
          <h2>Browser History data</h2>
          <div className='tagCloudSection width--50'>
            <h3>Website titles</h3>
            <hr />
            { tagCloudHTML }
          </div>

          <div className="topURLsSection width--50">
            <h3>URL's</h3>
            <hr />
            <div className='tagContainer'>
              { topURLs }
            </div>
          </div>
        </div>

        <div className="autofill" id='autofill'>
          <h2>Autofill data</h2>
          <div className='autofillProfile width--50'>
            <h3>Profile</h3>
            <hr />
            { profileData }
            <p></p>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2023 - Niek Rottier</p>
      </footer>
    </div>
  );
}

export default Decoder;
