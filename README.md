# Bloom Filter

Simple implementation of Bloom Filter.


### Prerequisites

* Python 3
* pyhash

```
$ pip install pyhash
```

### Usage

```
>>> from bloom_filter import BloomFilter

>>> bloom = BloomFilter(bit_vector_size = 10)
>>> bloom.add("just_some_text")

>>> bloom.search("just_some_text")
Maybe the element is there.

>>> bloom.search("new_text")
No, the element isn't there.
```

## Tests

### Prerequisites

* sys
* random
* string
* logging


### Example

```
$ tests/bloom_filter_test.py
```

## Authors

* **Nikos Tziralis** - *Initial work* - [Bloom Filter](https://github.com/ntzi/bloom_filter)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/
* https://llimllib.github.io/bloomfilter-tutorial/
